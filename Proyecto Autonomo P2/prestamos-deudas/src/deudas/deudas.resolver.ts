import { Resolver, Query, Mutation, Args, Int, ResolveReference } from '@nestjs/graphql';
import { DeudasService } from './deudas.service';
import { Deuda } from './entities/deuda.entity';
import { CreateDeudaInput } from './dto/create-deuda.input';
import { UpdateDeudaInput } from './dto/update-deuda.input';

@Resolver(() => Deuda)
export class DeudasResolver {
  constructor(private readonly deudasService: DeudasService) {}

  @Mutation(() => Deuda)
  createDeuda(@Args('createDeudaInput') createDeudaInput: CreateDeudaInput) {
    return this.deudasService.create(createDeudaInput);
  }

  @Query(() => [Deuda], { name: 'deudas' })
  findAll() {
    return this.deudasService.findAll();
  }

  @Query(() => Deuda, { name: 'deuda' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.deudasService.findOne(id);
  }

  @Mutation(() => Deuda)
  updateDeuda(@Args('updateDeudaInput') updateDeudaInput: UpdateDeudaInput) {
    return this.deudasService.update(updateDeudaInput.id, updateDeudaInput);
  }

  @Mutation(() => Deuda)
  removeDeuda(@Args('id', { type: () => Int }) id: number) {
    return this.deudasService.remove(id);
  }
  @ResolveReference()
    resolveReference(reference: {__typename: string; id: number}):
    Promise<Deuda> {
      return this.deudasService.findOne(reference.id);
  }
}
