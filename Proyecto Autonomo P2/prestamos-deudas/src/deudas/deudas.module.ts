import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeudasService } from './deudas.service';
import { DeudasResolver } from './deudas.resolver';
import { DeudasGateway } from './deudas.gateway';
import { DeudasController } from './deudas.controller';
import { Deuda } from './entities/deuda.entity';
import { Pago } from '../pagos/entities/pago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deuda, Pago])],
  providers: [DeudasService, DeudasResolver, DeudasGateway],
  controllers: [DeudasController],
})
export class DeudasModule {}
