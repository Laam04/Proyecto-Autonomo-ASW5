import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GastosService } from './gastos.service';
import { Gasto } from './entities/gasto.entity';

@WebSocketGateway()
export class GastosGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gastosService: GastosService) {}

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('findAllGastos')
  async handleFindAll(): Promise<void> {
    const gastos: Gasto[] = await this.gastosService.findAll();
    this.server.emit('gastosList', gastos);
  }

  @SubscribeMessage('findGasto')
  async handleFindGasto(@MessageBody() id: number): Promise<void> {
    const gasto: Gasto = await this.gastosService.findOne(id);
    this.server.emit('gastoDetails', gasto);
  }
}
