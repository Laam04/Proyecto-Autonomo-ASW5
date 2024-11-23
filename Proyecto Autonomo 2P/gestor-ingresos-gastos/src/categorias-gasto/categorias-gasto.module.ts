import { Module } from '@nestjs/common';
import { CategoriasGastoService } from './categorias-gasto.service';
import { CategoriasGastoResolver } from './categorias-gasto.resolver';
import { CategoriasGastoController } from './categorias-gasto.controller';

@Module({
  providers: [CategoriasGastoResolver, CategoriasGastoService],
  controllers: [CategoriasGastoController],
})
export class CategoriasGastoModule {}
