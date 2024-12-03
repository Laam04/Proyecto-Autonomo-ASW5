import { Resolver, Query, Mutation, Args, ResolveReference } from '@nestjs/graphql';
import { CurrenciesService } from './currencies.service';
import { Currency } from './entities/currency.entity';
import { CreateCurrencyInput } from './dto/create-currency.input';

@Resolver(() => Currency)
export class CurrenciesResolver {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Mutation(() => Currency)
  async createCurrency(@Args('createCurrencyInput') createCurrencyInput: CreateCurrencyInput): Promise<Currency> {
    return this.currenciesService.create(createCurrencyInput);
  }

  @Query(() => [Currency])
  async currencies(): Promise<Currency[]> {
    return this.currenciesService.findAll();
  }

  @Query(() => Currency)
  async currency(@Args('id') id: number): Promise<Currency> {
    return this.currenciesService.findOne(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }): Promise<Currency> {
    return this.currenciesService.findOne(reference.id);
  }
}
