import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IngresoService } from './ingresos.service';
import { Ingreso } from './entities/ingreso.entity';

@WebSocketGateway()
export class IngresosGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly ingresosService: IngresoService) {}

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('findAllIngresos')
  async handleFindAll(): Promise<void> {
    const ingresos: Ingreso[] = await this.ingresosService.findAll();
    this.server.emit('ingresosList', ingresos);
  }

  @SubscribeMessage('findIngreso')
  async handleFindIngreso(@MessageBody() id: number): Promise<void> {
    const ingreso: Ingreso = await this.ingresosService.findOne(id);
    this.server.emit('ingresoDetails', ingreso);
  }
}
