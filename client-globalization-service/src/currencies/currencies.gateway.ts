import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CurrenciesService } from './currencies.service';

@WebSocketGateway()
export class CurrenciesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly currenciesService: CurrenciesService) {}

  @SubscribeMessage('getCurrencies')
  async handleCurrenciesRequest(client: Socket): Promise<void> {
    const currencies = await this.currenciesService.findAll();
    client.emit('currenciesData', currencies); 
  }

  @SubscribeMessage('getCurrencyById')
  async handleCurrencyById(client: Socket, @MessageBody() id: number): Promise<void> {
    const currency = await this.currenciesService.findOne(id);
    client.emit('currencyData', currency); 
  }
}
