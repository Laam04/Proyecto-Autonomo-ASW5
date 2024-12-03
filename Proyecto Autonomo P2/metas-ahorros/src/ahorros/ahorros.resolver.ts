import { Resolver, Query, Mutation, Args, ResolveReference } from '@nestjs/graphql';
import { AhorrosService } from './ahorros.service';
import { Ahorro } from './entities/ahorro.entity';
import { CreateAhorroInput } from './dto/create-ahorro.input';
import { UpdateAhorroInput } from './dto/update-ahorro.input';

@Resolver(() => Ahorro)
export class AhorrosResolver {
  constructor(private readonly ahorrosService: AhorrosService) {}

  @Mutation(() => Ahorro)
  async createAhorro(@Args('createAhorroInput') createAhorroInput: CreateAhorroInput): Promise<Ahorro> {
    return this.ahorrosService.create(createAhorroInput);
  }

  @Query(() => [Ahorro])
  async ahorros(): Promise<Ahorro[]> {
    return this.ahorrosService.findAll();
  }

  @Query(() => Ahorro)
  async ahorro(@Args('id') id: number): Promise<Ahorro> {
    return this.ahorrosService.findOne(id);
  }

  @Mutation(() => Boolean)
  async removeAhorro(@Args('id') id: number): Promise<boolean> {
    await this.ahorrosService.remove(id);
    return true;
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }): Promise<Ahorro> {
    return this.ahorrosService.findOne(reference.id);
  }
}
