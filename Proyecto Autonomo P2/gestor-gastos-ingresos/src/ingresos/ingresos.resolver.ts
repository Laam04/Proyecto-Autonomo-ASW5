import { Resolver, Query, Mutation, Args, Int, ResolveReference } from '@nestjs/graphql';
import { Ingreso } from './entities/ingreso.entity';
import { IngresoService } from './ingresos.service';
import { CreateIngresoInput } from './dto/create-ingreso.input';
import { UpdateIngresoInput } from './dto/update-ingreso.input';

@Resolver(of => Ingreso)
export class IngresoResolver {
  constructor(private ingresoService: IngresoService) {}

  @Query(returns => [Ingreso])
  async ingresos(): Promise<Ingreso[]> {
    return this.ingresoService.findAll();
  }

  @Mutation(returns => Ingreso)
  async createIngreso(
    @Args('createIngresoInput') createIngresoInput: CreateIngresoInput,
  ): Promise<Ingreso> {
    return this.ingresoService.create(createIngresoInput);
  }

  @Mutation(returns => Ingreso)
  async updateIngreso(
    @Args('updateIngresoInput') updateIngresoInput: UpdateIngresoInput,
  ): Promise<Ingreso> {
    return this.ingresoService.update(updateIngresoInput);
  }

  @Query(returns => Ingreso)
  async ingreso(@Args('id', { type: () => Int }) id: number): Promise<Ingreso> {
    return this.ingresoService.findOne(id);
  }
  @ResolveReference()
    resolveReference(reference: {__typename: string; id: number}):
    Promise<Ingreso> {
      return this.ingresoService.findOne(reference.id);
  }
}
