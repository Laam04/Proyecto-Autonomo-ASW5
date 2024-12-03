import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Account } from '../accounts/entities/account.entity';
import { ProfilesGateway } from './profiles.gateway';
import { CurrenciesModule } from '../currencies/currencies.module';
import { Currency } from '../currencies/entities/currency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Account, Currency])],
  providers: [ProfilesService, ProfilesResolver, ProfilesGateway, CurrenciesModule],
  controllers: [ProfilesController],
})
export class ProfilesModule {}
