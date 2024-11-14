import { Resolver, Query, Mutation, Args, Int, ResolveReference } from '@nestjs/graphql';
import { PrestamosService } from './prestamos.service';
import { Prestamo } from './entities/prestamo.entity';
import { CreatePrestamoInput } from './dto/create-prestamo.input';
import { UpdatePrestamoInput } from './dto/update-prestamo.input';

@Resolver(() => Prestamo)
export class PrestamosResolver {
  constructor(private readonly prestamosService: PrestamosService) {}

  @Mutation(() => Prestamo)
  createPrestamo(@Args('createPrestamoInput') createPrestamoInput: CreatePrestamoInput) {
    return this.prestamosService.create(createPrestamoInput);
  }

  @Query(() => [Prestamo], { name: 'prestamos' })
  findAll() {
    return this.prestamosService.findAll();
  }

  @Query(() => Prestamo, { name: 'prestamo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.prestamosService.findOne(id);
  }

  @Mutation(() => Prestamo)
  updatePrestamo(@Args('updatePrestamoInput') updatePrestamoInput: UpdatePrestamoInput) {
    return this.prestamosService.update(updatePrestamoInput.id, updatePrestamoInput);
  }

  @Mutation(() => Prestamo)
  removePrestamo(@Args('id', { type: () => Int }) id: number) {
    return this.prestamosService.remove(id);
  }
  @ResolveReference()
    resolveReference(reference: {__typename: string; id: number}):
    Promise<Prestamo> {
      return this.prestamosService.findOne(reference.id);
  }
}
