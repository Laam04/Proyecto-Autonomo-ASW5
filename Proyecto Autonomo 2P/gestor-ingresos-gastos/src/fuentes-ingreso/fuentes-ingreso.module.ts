import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuentesIngresoService } from './fuentes-ingreso.service';
import { FuentesIngresoResolver } from './fuentes-ingreso.resolver';
import { FuentesIngresoController } from './fuentes-ingreso.controller';
import { FuenteIngreso } from './entities/fuentes-ingreso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FuenteIngreso])],
  controllers: [FuentesIngresoController],
  providers: [FuentesIngresoService, FuentesIngresoResolver],
})
export class FuentesIngresoModule {}
