import { Resolver, Query, Mutation, Args, ResolveReference } from '@nestjs/graphql';
import { HistorialMetasService } from './historial.service';
import { HistorialMeta } from './entities/historial.entity';
import { CreateHistorialMetaInput } from './dto/create-historial.input';
import { UpdateHistorialMetaInput } from './dto/update-historial.input';

@Resolver(() => HistorialMeta)
export class HistorialMetasResolver {
  constructor(private readonly historialMetasService: HistorialMetasService) {}

  @Mutation(() => HistorialMeta)
  async createHistorialMeta(
    @Args('createHistorialMetaInput') createHistorialMetaInput: CreateHistorialMetaInput,
  ): Promise<HistorialMeta> {
    return this.historialMetasService.create(createHistorialMetaInput);
  }

  @Query(() => [HistorialMeta])
  async historialMetas(): Promise<HistorialMeta[]> {
    return this.historialMetasService.findAll();
  }

  @Query(() => HistorialMeta)
  async historialMeta(@Args('id') id: number): Promise<HistorialMeta> {
    return this.historialMetasService.findOne(id);
  }

  @Mutation(() => Boolean)
  async removeHistorialMeta(@Args('id') id: number): Promise<boolean> {
    await this.historialMetasService.remove(id);
    return true;
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }): Promise<HistorialMeta> {
    return this.historialMetasService.findOne(reference.id);
  }
}
