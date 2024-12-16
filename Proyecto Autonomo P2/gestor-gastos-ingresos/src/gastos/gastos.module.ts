import { Module } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { GastoResolver } from './gastos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gasto } from './entities/gasto.entity';
import { CategoriaGasto } from '../categoria-gastos/entities/categoria-gasto.entity';
import { GastosGateway } from './gastos.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Gasto, CategoriaGasto])],
  providers: [GastosService, GastoResolver, GastosGateway],
  exports:[GastosService, GastoResolver, GastosGateway],
})
export class GastoModule {}
