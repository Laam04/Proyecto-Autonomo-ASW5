import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ProfilesService } from './profiles.service';

@WebSocketGateway()
export class ProfilesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly profilesService: ProfilesService) {}

  @SubscribeMessage('getProfiles')
  async handleProfilesRequest(client: Socket): Promise<void> {
    const profiles = await this.profilesService.findAll();
    client.emit('profilesData', profiles); 
  }

  @SubscribeMessage('getProfileById')
  async handleProfileById(client: Socket, @MessageBody() id: number): Promise<void> {
    const profile = await this.profilesService.findOne(id);
    client.emit('profileData', profile);
  }
}
