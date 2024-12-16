import { Module } from '@nestjs/common';
import { FuenteIngresoService } from './fuente-ingresos.service';
import { FuenteIngresoResolver } from './fuente-ingresos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuenteIngreso } from './entities/fuente-ingreso.entity';
import { FuenteIngresoGateway } from './fuente-ingresos.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([FuenteIngreso])],
  providers: [FuenteIngresoService, FuenteIngresoResolver, FuenteIngresoGateway],
  exports: [FuenteIngresoService, FuenteIngresoResolver, FuenteIngresoGateway],
  
})
export class FuenteIngresoModule {}
