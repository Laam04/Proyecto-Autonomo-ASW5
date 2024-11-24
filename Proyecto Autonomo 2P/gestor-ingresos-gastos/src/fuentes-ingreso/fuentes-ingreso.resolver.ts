import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FuentesIngresoService } from './fuentes-ingreso.service';
import { FuenteIngreso } from './entities/fuentes-ingreso.entity';
import { CreateFuenteIngresoDto } from './dto/create-fuentes-ingreso.dto';
import { UpdateFuenteIngresoDto } from './dto/update-fuentes-ingreso.dto';

@Resolver(() => FuenteIngreso)
export class FuentesIngresoResolver {
  constructor(private readonly fuentesIngresoService: FuentesIngresoService) {}

  @Query(() => [FuenteIngreso])
  findAll() {
    return this.fuentesIngresoService.findAll();
  }

  @Query(() => FuenteIngreso)
  findOne(@Args('id') id: number) {
    return this.fuentesIngresoService.findOne(id);
  }

  @Mutation(() => FuenteIngreso)
  createFuenteIngreso(@Args('createFuenteIngresoDto') createFuenteIngresoDto: CreateFuenteIngresoDto) {
    return this.fuentesIngresoService.create(createFuenteIngresoDto);
  }

  @Mutation(() => FuenteIngreso)
  updateFuenteIngreso(@Args('id') id: number, @Args('updateFuenteIngresoDto') updateFuenteIngresoDto: UpdateFuenteIngresoDto) {
    return this.fuentesIngresoService.update(id, updateFuenteIngresoDto);
  }

  @Mutation(() => Boolean)
  removeFuenteIngreso(@Args('id') id: number) {
    return this.fuentesIngresoService.remove(id);
  }
}
