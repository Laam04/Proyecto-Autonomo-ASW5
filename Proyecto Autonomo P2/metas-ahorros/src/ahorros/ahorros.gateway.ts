import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AhorrosService } from './ahorros.service';

@WebSocketGateway()
export class AhorrosGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly ahorrosService: AhorrosService) {}

  @SubscribeMessage('getAhorros')
  async handleAhorrosRequest(client: Socket): Promise<void> {
    const ahorros = await this.ahorrosService.findAll();
    client.emit('ahorrosData', ahorros);
  }

  @SubscribeMessage('getAhorroById')
  async handleAhorroById(client: Socket, @MessageBody() id: number): Promise<void> {
    const ahorro = await this.ahorrosService.findOne(id);
    client.emit('ahorroData', ahorro);
  }

  @SubscribeMessage('createAhorro')
  async handleCreateAhorro(client: Socket, @MessageBody() createAhorroInput: any): Promise<void> {
    const newAhorro = await this.ahorrosService.create(createAhorroInput);
    this.server.emit('ahorroCreated', newAhorro);
  }

  @SubscribeMessage('deleteAhorro')
  async handleDeleteAhorro(client: Socket, @MessageBody() id: number): Promise<void> {
    await this.ahorrosService.remove(id);
    this.server.emit('ahorroDeleted', { id });
  }
}
