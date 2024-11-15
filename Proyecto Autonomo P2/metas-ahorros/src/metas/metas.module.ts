import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meta } from './entities/meta.entity';
import { MetasService } from './metas.service';
import { MetasResolver } from './metas.resolver';
import { MetasGateway } from './metas.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Meta])],
  providers: [MetasService, MetasResolver, MetasGateway],
})
export class MetasModule {}
