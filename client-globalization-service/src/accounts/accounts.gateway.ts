import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AccountsService } from './accounts.service';

@WebSocketGateway()
export class AccountsGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly accountsService: AccountsService) {}

  @SubscribeMessage('getAccounts')
  async handleAccountsRequest(client: Socket): Promise<void> {
    const accounts = await this.accountsService.findAll();
    client.emit('accountsData', accounts); 
  }

  @SubscribeMessage('getAccountById')
  async handleAccountById(client: Socket, @MessageBody() id: number): Promise<void> {
    const account = await this.accountsService.findOne(id);
    client.emit('accountData', account);
  }
}
