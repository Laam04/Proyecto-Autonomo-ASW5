import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleConnection(client: any) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }
}
