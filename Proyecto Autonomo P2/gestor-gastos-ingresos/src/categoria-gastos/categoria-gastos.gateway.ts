import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { CategoriaGastoService } from './categoria-gastos.service';
import { CategoriaGasto } from './entities/categoria-gasto.entity';

@WebSocketGateway()
export class CategoriaGastoGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private readonly categoriaGastoService: CategoriaGastoService) {}

  handleConnection(client: any) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('findAllCategorias')
  async handleFindAll(): Promise<void> {
    const categorias: CategoriaGasto[] = await this.categoriaGastoService.findAll();
    this.server.emit('categoriaGastoList', categorias);
  }

  @SubscribeMessage('findCategoria')
  async handleFindCategoria(@MessageBody() id: number): Promise<void> {
    const categoria: CategoriaGasto = await this.categoriaGastoService.findOne(id);
    this.server.emit('categoriaGastoDetails', categoria);
  }
}
