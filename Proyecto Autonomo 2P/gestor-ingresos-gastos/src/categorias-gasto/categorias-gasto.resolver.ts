import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoriasGastoService } from './categorias-gasto.service';
import { CategoriaGasto } from './entities/categorias-gasto.entity';
import { CreateCategoriaGastoDto } from './dto/create-categorias-gasto.dto';
import { UpdateCategoriaGastoDto } from './dto/update-categorias-gasto.dto';

@Resolver(() => CategoriaGasto)
export class CategoriasGastoResolver {
  constructor(private readonly categoriasGastoService: CategoriasGastoService) {}

  @Query(() => [CategoriaGasto])
  findAll() {
    return this.categoriasGastoService.findAll();
  }

  @Query(() => CategoriaGasto)
  findOne(@Args('id') id: number) {
    return this.categoriasGastoService.findOne(id);
  }

  @Mutation(() => CategoriaGasto)
  createCategoriaGasto(@Args('createCategoriaGastoDto') createCategoriaGastoDto: CreateCategoriaGastoDto) {
    return this.categoriasGastoService.create(createCategoriaGastoDto);
  }

  @Mutation(() => CategoriaGasto)
  updateCategoriaGasto(@Args('id') id: number, @Args('updateCategoriaGastoDto') updateCategoriaGastoDto: UpdateCategoriaGastoDto) {
    return this.categoriasGastoService.update(id, updateCategoriaGastoDto);
  }

  @Mutation(() => Boolean)
  removeCategoriaGasto(@Args('id') id: number) {
    return this.categoriasGastoService.remove(id);
  }
}
