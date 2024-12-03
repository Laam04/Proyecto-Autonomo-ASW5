import { Controller, Get } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get('generate-pdf')
  async generatePdf(): Promise<string> {
    const profiles: Profile[] = await this.profilesService.findAll();
    return this.profilesService.generateProfileReport(profiles);
  }
}
