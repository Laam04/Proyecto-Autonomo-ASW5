import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { IngresosService } from './ingresos.service';
import { Ingresos } from './entities/ingreso.entity';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { UpdateIngresoDto } from './dto/update-ingreso.dto';

@Resolver(() => Ingresos)
export class IngresosResolver {
  constructor(private readonly ingresosService: IngresosService) {}

  @Query(() => [Ingresos])
  findAll() {
    return this.ingresosService.findAll();
  }

  @Query(() => Ingresos)
  findOne(@Args('id') id: number) {
    return this.ingresosService.findOne(id);
  }

  @Mutation(() => Ingresos)
  createIngreso(@Args('createIngresoDto') createIngresoDto: CreateIngresoDto) {
    return this.ingresosService.create(createIngresoDto);
  }

  @Mutation(() => Ingresos)
  updateIngreso(@Args('id') id: number, @Args('updateIngresoDto') updateIngresoDto: UpdateIngresoDto) {
    return this.ingresosService.update(id, updateIngresoDto);
  }

  @Mutation(() => Boolean)
  removeIngreso(@Args('id') id: number) {
    return this.ingresosService.remove(id);
  }
}
