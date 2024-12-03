import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialMeta } from './entities/historial.entity';
import { HistorialMetasService } from './historial.service';
import { HistorialMetasResolver } from './historial.resolver';
import { HistorialMetasGateway } from './historial.gateway';
import { HistorialMetaController } from './historial.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HistorialMeta])],
  providers: [HistorialMetasService, HistorialMetasResolver, HistorialMetasGateway],
  controllers: [HistorialMetaController],
})
export class HistorialMetasModule {}
//