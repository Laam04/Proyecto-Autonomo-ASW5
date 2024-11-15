import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MetasService } from './metas.service';

@WebSocketGateway()
export class MetasGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly metasService: MetasService) {}

  @SubscribeMessage('getMetas')
  async handleMetasRequest(client: Socket): Promise<void> {
    const metas = await this.metasService.findAll();
    client.emit('metasData', metas);
  }

  @SubscribeMessage('getMetaById')
  async handleMetaById(client: Socket, @MessageBody() id: number): Promise<void> {
    const meta = await this.metasService.findOne(id);
    client.emit('metaData', meta);
  }

  @SubscribeMessage('createMeta')
  async handleCreateMeta(client: Socket, @MessageBody() createMetaInput: any): Promise<void> {
    const newMeta = await this.metasService.create(createMetaInput);
    this.server.emit('metaCreated', newMeta); // Notify all connected clients
  }

  @SubscribeMessage('updateMeta')
  async handleUpdateMeta(client: Socket, @MessageBody() data: { id: number; updateMetaInput: any }): Promise<void> {
    const updatedMeta = await this.metasService.update(data.id, data.updateMetaInput);
    this.server.emit('metaUpdated', updatedMeta); // Notify all connected clients
  }

  @SubscribeMessage('deleteMeta')
  async handleDeleteMeta(client: Socket, @MessageBody() id: number): Promise<void> {
    await this.metasService.remove(id);
    this.server.emit('metaDeleted', { id });
  }
}
