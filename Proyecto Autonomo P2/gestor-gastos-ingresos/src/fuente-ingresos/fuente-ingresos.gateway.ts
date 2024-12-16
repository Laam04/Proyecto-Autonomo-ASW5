import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FuenteIngresoService } from './fuente-ingresos.service';
import { FuenteIngreso } from './entities/fuente-ingreso.entity';

@WebSocketGateway()
export class FuenteIngresoGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly fuenteIngresoService: FuenteIngresoService) {}

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('findAllFuenteIngreso')
  async handleFindAll(): Promise<void> {
    const fuentesIngreso: FuenteIngreso[] = await this.fuenteIngresoService.findAll();
    this.server.emit('fuentesIngresoList', fuentesIngreso);
  }

  @SubscribeMessage('findFuenteIngreso')
  async handleFindFuenteIngreso(@MessageBody() id: number): Promise<void> {
    const fuenteIngreso: FuenteIngreso = await this.fuenteIngresoService.findOne(id);
    this.server.emit('fuenteIngresoDetails', fuenteIngreso);
  }
}
