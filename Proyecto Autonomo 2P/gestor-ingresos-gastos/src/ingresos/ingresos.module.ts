import { Module } from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { IngresosResolver } from './ingresos.resolver';
import { IngresosController } from './ingresos.controller';

@Module({
  providers: [IngresosResolver, IngresosService],
  controllers: [IngresosController],
})
export class IngresosModule {}
