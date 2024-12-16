import { Resolver, Query, Mutation, Args, Int, ResolveReference } from '@nestjs/graphql';
import { Gasto } from './entities/gasto.entity';
import { GastosService } from './gastos.service';
import { CreateGastoInput } from './dto/create-gasto.input';
import { UpdateGastoInput } from './dto/update-gasto.input';

@Resolver(of => Gasto)
export class GastoResolver {
  constructor(private gastosService: GastosService) {}

  @Query(returns => [Gasto])
  async gastos(): Promise<Gasto[]> {
    return this.gastosService.findAll();
  }

  @Mutation(returns => Gasto)
  async createGasto(
    @Args('createGastoInput') createGastoInput: CreateGastoInput,
  ): Promise<Gasto> {
    return this.gastosService.create(createGastoInput);
  }

  @Mutation(returns => Gasto)
async updateGasto(
  @Args('updateGastoInput') updateGastoInput: UpdateGastoInput,
): Promise<Gasto> {
  return this.gastosService.update(updateGastoInput);
}

  @Query(returns => Gasto)
  async gasto(@Args('id', { type: () => Int }) id: number): Promise<Gasto> {
    return this.gastosService.findOne(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }): Promise<Gasto> {
    return this.gastosService.findOne(reference.id);
  }
}
