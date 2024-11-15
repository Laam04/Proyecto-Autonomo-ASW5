import { Resolver, Query, Mutation, Args, ResolveReference } from '@nestjs/graphql';
import { MetasService } from './metas.service';
import { Meta } from './entities/meta.entity';
import { CreateMetaInput } from './dto/create-meta.input';
import { UpdateMetaInput } from './dto/update-meta.input';

@Resolver(() => Meta)
export class MetasResolver {
  constructor(private readonly metasService: MetasService) {}

  @Mutation(() => Meta)
  async createMeta(@Args('createMetaInput') createMetaInput: CreateMetaInput): Promise<Meta> {
    return this.metasService.create(createMetaInput);
  }

  @Query(() => [Meta])
  async metas(): Promise<Meta[]> {
    return this.metasService.findAll();
  }

  @Query(() => Meta)
  async meta(@Args('id') id: number): Promise<Meta> {
    return this.metasService.findOne(id);
  }

  @Mutation(() => Meta)
  async updateMeta(@Args('id') id: number, @Args('updateMetaInput') updateMetaInput: UpdateMetaInput): Promise<Meta> {
    return this.metasService.update(id, updateMetaInput);
  }

  @Mutation(() => Boolean)
  async removeMeta(@Args('id') id: number): Promise<boolean> {
    await this.metasService.remove(id);
    return true;
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }): Promise<Meta> {
    return this.metasService.findOne(reference.id);
  }
}
