import { Module } from '@nestjs/common';
import { FuentesIngresoService } from './fuentes-ingreso.service';
import { FuentesIngresoResolver } from './fuentes-ingreso.resolver';
import { FuentesIngresoController } from './fuentes-ingreso.controller';

@Module({
  providers: [FuentesIngresoResolver, FuentesIngresoService],
  controllers: [FuentesIngresoController],
})
export class FuentesIngresoModule {}
