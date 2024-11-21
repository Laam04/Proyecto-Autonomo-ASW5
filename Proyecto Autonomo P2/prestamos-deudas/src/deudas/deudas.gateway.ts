import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { DeudasService } from './deudas.service';
import { Deuda } from './entities/deuda.entity';

@WebSocketGateway()
export class DeudasGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly deudasService: DeudasService) {}

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('findAllDeudas')
  async handleFindAll(): Promise<void> {
    const deudas: Deuda[] = await this.deudasService.findAll();
    this.server.emit('deudasList', deudas);
  }

  @SubscribeMessage('findDeuda')
  async handleFindDeuda(@MessageBody() id: number): Promise<void> {
    const deuda: Deuda = await this.deudasService.findOne(id);
    this.server.emit('deudaDetails', deuda);
  }
}
