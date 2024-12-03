import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HistorialMetasService } from './historial.service';

@WebSocketGateway()
export class HistorialMetasGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly historialMetasService: HistorialMetasService) {}

  @SubscribeMessage('getHistorialMetas')
  async handleHistorialMetasRequest(client: Socket): Promise<void> {
    const historialMetas = await this.historialMetasService.findAll();
    client.emit('historialMetasData', historialMetas);
  }

  @SubscribeMessage('getHistorialMetaById')
  async handleHistorialMetaById(client: Socket, @MessageBody() id: number): Promise<void> {
    const historialMeta = await this.historialMetasService.findOne(id);
    client.emit('historialMetaData', historialMeta);
  }

  @SubscribeMessage('createHistorialMeta')
  async handleCreateHistorialMeta(client: Socket, @MessageBody() createHistorialMetaInput: any): Promise<void> {
    const newHistorialMeta = await this.historialMetasService.create(createHistorialMetaInput);
    this.server.emit('historialMetaCreated', newHistorialMeta);
  }

  @SubscribeMessage('deleteHistorialMeta')
  async handleDeleteHistorialMeta(client: Socket, @MessageBody() id: number): Promise<void> {
    await this.historialMetasService.remove(id);
    this.server.emit('historialMetaDeleted', { id });
  }
}
