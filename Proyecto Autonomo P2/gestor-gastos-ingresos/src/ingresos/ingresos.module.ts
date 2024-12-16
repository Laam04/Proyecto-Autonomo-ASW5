import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresoService } from './ingresos.service';
import { IngresoResolver } from './ingresos.resolver';
import { Ingreso } from './entities/ingreso.entity';
import { FuenteIngreso } from '../fuente-ingresos/entities/fuente-ingreso.entity';
import { IngresosGateway } from './ingresos.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Ingreso, FuenteIngreso])],
  providers: [IngresoService, IngresoResolver, IngresosGateway],
  exports:[IngresoService, IngresoResolver, IngresosGateway],
})
export class IngresoModule {}
