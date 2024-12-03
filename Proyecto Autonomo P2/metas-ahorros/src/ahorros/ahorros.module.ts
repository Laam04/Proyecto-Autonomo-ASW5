import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ahorro } from './entities/ahorro.entity';
import { AhorrosService } from './ahorros.service';
import { AhorrosResolver } from './ahorros.resolver';
import { AhorrosGateway } from './ahorros.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Ahorro])],
  providers: [AhorrosService, AhorrosResolver, AhorrosGateway],
})
export class AhorrosModule {}
