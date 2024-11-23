import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FuentesIngresoService } from './fuentes-ingreso.service';
import { FuentesIngreso } from './entities/fuentes-ingreso.entity';
import { CreateFuentesIngresoInput } from './dto/create-fuentes-ingreso.input';
import { UpdateFuentesIngresoInput } from './dto/update-fuentes-ingreso.input';

@Resolver(() => FuentesIngreso)
export class FuentesIngresoResolver {
  constructor(private readonly fuentesIngresoService: FuentesIngresoService) {}

  @Mutation(() => FuentesIngreso)
  createFuentesIngreso(@Args('createFuentesIngresoInput') createFuentesIngresoInput: CreateFuentesIngresoInput) {
    return this.fuentesIngresoService.create(createFuentesIngresoInput);
  }

  @Query(() => [FuentesIngreso], { name: 'fuentesIngreso' })
  findAll() {
    return this.fuentesIngresoService.findAll();
  }

  @Query(() => FuentesIngreso, { name: 'fuentesIngreso' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.fuentesIngresoService.findOne(id);
  }

  @Mutation(() => FuentesIngreso)
  updateFuentesIngreso(@Args('updateFuentesIngresoInput') updateFuentesIngresoInput: UpdateFuentesIngresoInput) {
    return this.fuentesIngresoService.update(updateFuentesIngresoInput.id, updateFuentesIngresoInput);
  }

  @Mutation(() => FuentesIngreso)
  removeFuentesIngreso(@Args('id', { type: () => Int }) id: number) {
    return this.fuentesIngresoService.remove(id);
  }
}
