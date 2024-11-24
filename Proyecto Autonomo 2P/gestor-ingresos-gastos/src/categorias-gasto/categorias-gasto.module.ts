import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasGastoService } from './categorias-gasto.service';
import { CategoriasGastoResolver } from './categorias-gasto.resolver';
import { CategoriasGastoController } from './categorias-gasto.controller';
import { CategoriaGasto } from './entities/categorias-gasto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaGasto])],
  controllers: [CategoriasGastoController],
  providers: [CategoriasGastoService, CategoriasGastoResolver],
})
export class CategoriasGastoModule {}
