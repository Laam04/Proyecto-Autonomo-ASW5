import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { PagosResolver } from './pagos.resolver';
import { PagosGateway } from './pagos.gateway';
import { Pago } from './entities/pago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pago])],
  controllers: [PagosController],
  providers: [PagosService, PagosResolver, PagosGateway],
})
export class PagosModule {}
