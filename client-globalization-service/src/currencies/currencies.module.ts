import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesResolver } from './currencies.resolver';
import { CurrenciesController } from './currencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from './entities/currency.entity';
import { Account } from '../accounts/entities/account.entity';
import { CurrenciesGateway } from './currencies.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Currency, Account])],
  providers: [CurrenciesService, CurrenciesResolver, CurrenciesGateway],
  controllers: [CurrenciesController],
})
export class CurrenciesModule {}
