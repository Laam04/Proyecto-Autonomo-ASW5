import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GastosService } from './gastos.service';
import { Gastos } from './entities/gasto.entity';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';

@Resolver(() => Gastos)
export class GastosResolver {
  constructor(private readonly gastosService: GastosService) {}

  @Query(() => [Gastos])
  findAll() {
    return this.gastosService.findAll();
  }

  @Query(() => Gastos)
  findOne(@Args('id') id: number) {
    return this.gastosService.findOne(id);
  }

  @Mutation(() => Gastos)
  createGasto(@Args('createGastoDto') createGastoDto: CreateGastoDto) {
    return this.gastosService.create(createGastoDto);
  }

  @Mutation(() => Gastos)
  updateGasto(@Args('id') id: number, @Args('updateGastoDto') updateGastoDto: UpdateGastoDto) {
    return this.gastosService.update(id, updateGastoDto);
  }

  @Mutation(() => Boolean)
  removeGasto(@Args('id') id: number) {
    return this.gastosService.remove(id);
  }
}
