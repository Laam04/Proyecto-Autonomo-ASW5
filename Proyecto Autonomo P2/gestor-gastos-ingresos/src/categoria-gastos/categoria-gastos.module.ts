import { Module } from '@nestjs/common';
import { CategoriaGastoService } from './categoria-gastos.service';
import { CategoriaGastoResolver } from './categoria-gastos.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaGasto } from './entities/categoria-gasto.entity';
import { CategoriaGastoGateway } from './categoria-gastos.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaGasto])],
  providers: [CategoriaGastoService, CategoriaGastoResolver, CategoriaGastoGateway],
  exports:[CategoriaGastoService, CategoriaGastoResolver, CategoriaGastoGateway],
})
export class CategoriaGastoModule {}
