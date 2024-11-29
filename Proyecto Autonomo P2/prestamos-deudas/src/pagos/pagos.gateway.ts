import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PagosService } from './pagos.service';
import { Pago } from './entities/pago.entity';

@WebSocketGateway()
export class PagosGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly pagosService: PagosService) {}

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('findAllPagos')
  async handleFindAll(): Promise<void> {
    const pagos: Pago[] = await this.pagosService.findAll();
    this.server.emit('pagosList', pagos);
  }

  @SubscribeMessage('findPago')
  async handleFindPago(@MessageBody() id: number): Promise<void> {
    const pago: Pago = await this.pagosService.findOne(id);
    this.server.emit('pagoDetails', pago);
  }
}
