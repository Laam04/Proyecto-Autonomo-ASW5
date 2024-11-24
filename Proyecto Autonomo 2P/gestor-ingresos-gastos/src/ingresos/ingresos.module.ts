import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngresosService } from './ingresos.service';
import { IngresosResolver } from './ingresos.resolver';
import { IngresosController } from './ingresos.controller';
import { Ingresos } from './entities/ingreso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingresos])],
  controllers: [IngresosController],
  providers: [IngresosService, IngresosResolver],
})
export class IngresosModule {}
