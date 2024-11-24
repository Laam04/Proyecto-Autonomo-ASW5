import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GastosService } from './gastos.service';
import { GastosResolver } from './gastos.resolver';
import { GastosController } from './gastos.controller';
import { Gastos } from './entities/gasto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gastos])],
  controllers: [GastosController], 
  providers: [GastosService, GastosResolver],
})
export class GastosModule {}
