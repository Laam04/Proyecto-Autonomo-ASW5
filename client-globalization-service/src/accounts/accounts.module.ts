import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { AccountsService } from './accounts.service';
import { AccountsResolver } from './accounts.resolver';
import { AccountsGateway } from './accounts.gateway';
import { Profile } from '../profiles/entities/profile.entity';
import { Currency } from '../currencies/entities/currency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Profile, Currency])],
  providers: [AccountsService, AccountsResolver, AccountsGateway],
})
export class AccountsModule {}
