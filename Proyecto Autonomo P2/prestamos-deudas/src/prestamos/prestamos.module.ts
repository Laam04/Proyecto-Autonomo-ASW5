import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestamosService } from './prestamos.service';
import { PrestamosController } from './prestamos.controller';
import { PrestamosResolver } from './prestamos.resolver';
import { PrestamosGateway } from './prestamos.gateway';
import { Prestamo } from './entities/prestamo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prestamo])],
  controllers: [PrestamosController],
  providers: [PrestamosService, PrestamosResolver, PrestamosGateway],
})
export class PrestamosModule {}
