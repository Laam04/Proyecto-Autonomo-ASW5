import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PrestamosService } from './prestamos.service';

@WebSocketGateway()
export class PrestamosGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly prestamosService: PrestamosService) {}

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('findAllPrestamos')
  async handleFindAll(): Promise<void> {
    const prestamos = await this.prestamosService.findAll();
    this.server.emit('prestamosList', prestamos);
  }
}
