import { Module } from '@nestjs/common';
import { PdfGeneratorService } from './pdf-generator.service';
import { PdfGeneratorController } from './pdf-generator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingreso } from '../ingresos/entities/ingreso.entity';
import { Gasto } from '../gastos/entities/gasto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingreso, Gasto])],
  controllers: [PdfGeneratorController],
  providers: [PdfGeneratorService],
  exports:[PdfGeneratorService]
})
export class PdfGeneratorModule {}
