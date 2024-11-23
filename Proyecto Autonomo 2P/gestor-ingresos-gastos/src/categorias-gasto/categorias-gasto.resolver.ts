import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriasGastoService } from './categorias-gasto.service';
import { CategoriasGasto } from './entities/categorias-gasto.entity';
import { CreateCategoriasGastoInput } from './dto/create-categorias-gasto.input';
import { UpdateCategoriasGastoInput } from './dto/update-categorias-gasto.input';

@Resolver(() => CategoriasGasto)
export class CategoriasGastoResolver {
  constructor(private readonly categoriasGastoService: CategoriasGastoService) {}

  @Mutation(() => CategoriasGasto)
  createCategoriasGasto(@Args('createCategoriasGastoInput') createCategoriasGastoInput: CreateCategoriasGastoInput) {
    return this.categoriasGastoService.create(createCategoriasGastoInput);
  }

  @Query(() => [CategoriasGasto], { name: 'categoriasGasto' })
  findAll() {
    return this.categoriasGastoService.findAll();
  }

  @Query(() => CategoriasGasto, { name: 'categoriasGasto' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoriasGastoService.findOne(id);
  }

  @Mutation(() => CategoriasGasto)
  updateCategoriasGasto(@Args('updateCategoriasGastoInput') updateCategoriasGastoInput: UpdateCategoriasGastoInput) {
    return this.categoriasGastoService.update(updateCategoriasGastoInput.id, updateCategoriasGastoInput);
  }

  @Mutation(() => CategoriasGasto)
  removeCategoriasGasto(@Args('id', { type: () => Int }) id: number) {
    return this.categoriasGastoService.remove(id);
  }
}
