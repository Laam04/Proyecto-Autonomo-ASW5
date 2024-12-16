import { Module } from '@nestjs/common';
import { GraphGeneratorService } from './graph-generator.service';
import { GraphGeneratorResolver } from './graph-generator.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingreso } from '../ingresos/entities/ingreso.entity';
import { Gasto } from '../gastos/entities/gasto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingreso, Gasto])],
  providers: [GraphGeneratorService, GraphGeneratorResolver],
})
export class GraphGeneratorModule {}
