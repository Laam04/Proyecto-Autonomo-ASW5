import { Resolver, Query, Mutation, Args, Int, ResolveReference } from '@nestjs/graphql';
import { CategoriaGastoService } from './categoria-gastos.service';
import { CategoriaGasto } from './entities/categoria-gasto.entity';
import { CreateCategoriaGastoInput } from './dto/create-categoria-gasto.input';
import { UpdateCategoriaGastoInput } from './dto/update-categoria-gasto.input';

@Resolver(of => CategoriaGasto)
export class CategoriaGastoResolver {
  constructor(private categoriaGastoService: CategoriaGastoService) {}

  @Query(returns => [CategoriaGasto])
  async categoriaGastos(): Promise<CategoriaGasto[]> {
    return this.categoriaGastoService.findAll();
  }

  @Mutation(returns => CategoriaGasto)
  async createCategoriaGasto(
    @Args('createCategoriaGastoInput') createCategoriaGastoInput: CreateCategoriaGastoInput,
  ): Promise<CategoriaGasto> {
    return this.categoriaGastoService.create(createCategoriaGastoInput);
  }

  @Mutation(returns => CategoriaGasto)
  async updateCategoriaGasto(
    @Args('updateCategoriaGastoInput') updateCategoriaGastoInput: UpdateCategoriaGastoInput,
  ): Promise<CategoriaGasto> {
    return this.categoriaGastoService.update(updateCategoriaGastoInput);
  }

  @Query(returns => CategoriaGasto)
  async categoriaGasto(@Args('id', { type: () => Int }) id: number): Promise<CategoriaGasto> {
    return this.categoriaGastoService.findOne(id);
  }
  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }): 
  Promise<CategoriaGasto> {
    return this.categoriaGastoService.findOne(reference.id);
  }
}
