import { Resolver, Query, Mutation, Args, Int, ResolveReference } from '@nestjs/graphql';
import { FuenteIngreso } from './entities/fuente-ingreso.entity';
import { FuenteIngresoService } from './fuente-ingresos.service';
import { CreateFuenteIngresoInput } from './dto/create-fuente-ingreso.input';
import { UpdateFuenteIngresoInput } from './dto/update-fuente-ingreso.input';

@Resolver(of => FuenteIngreso)
export class FuenteIngresoResolver {
  constructor(private fuenteIngresoService: FuenteIngresoService) {}

  @Query(returns => [FuenteIngreso])
  async fuenteIngresos(): Promise<FuenteIngreso[]> {
    return this.fuenteIngresoService.findAll();
  }

  @Mutation(returns => FuenteIngreso)
  async createFuenteIngreso(
    @Args('createFuenteIngresoInput') createFuenteIngresoInput: CreateFuenteIngresoInput,
  ): Promise<FuenteIngreso> {
    return this.fuenteIngresoService.create(createFuenteIngresoInput);
  }

  @Mutation(returns => FuenteIngreso)
  async updateFuenteIngreso(
    @Args('updateFuenteIngresoInput') updateFuenteIngresoInput: UpdateFuenteIngresoInput,
  ): Promise<FuenteIngreso> {
    return this.fuenteIngresoService.update(updateFuenteIngresoInput);
  }

  @Query(returns => FuenteIngreso)
  async fuenteIngreso(@Args('id', { type: () => Int }) id: number): Promise<FuenteIngreso> {
    return this.fuenteIngresoService.findOne(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }): Promise<FuenteIngreso> {
    return this.fuenteIngresoService.findOne(reference.id);
  }
}
