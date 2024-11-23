import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IngresosService } from './ingresos.service';
import { Ingreso } from './entities/ingreso.entity';
import { CreateIngresoInput } from './dto/create-ingreso.input';
import { UpdateIngresoInput } from './dto/update-ingreso.input';

@Resolver(() => Ingreso)
export class IngresosResolver {
  constructor(private readonly ingresosService: IngresosService) {}

  @Mutation(() => Ingreso)
  createIngreso(@Args('createIngresoInput') createIngresoInput: CreateIngresoInput) {
    return this.ingresosService.create(createIngresoInput);
  }

  @Query(() => [Ingreso], { name: 'ingresos' })
  findAll() {
    return this.ingresosService.findAll();
  }

  @Query(() => Ingreso, { name: 'ingreso' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ingresosService.findOne(id);
  }

  @Mutation(() => Ingreso)
  updateIngreso(@Args('updateIngresoInput') updateIngresoInput: UpdateIngresoInput) {
    return this.ingresosService.update(updateIngresoInput.id, updateIngresoInput);
  }

  @Mutation(() => Ingreso)
  removeIngreso(@Args('id', { type: () => Int }) id: number) {
    return this.ingresosService.remove(id);
  }
}
