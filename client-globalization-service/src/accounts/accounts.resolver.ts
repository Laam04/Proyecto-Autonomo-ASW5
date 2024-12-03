import { Resolver, Query, Mutation, Args, ResolveReference } from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';
import { CreateAccountInput } from './dto/create-account.input';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Mutation(() => Account)
  async createAccount(@Args('createAccountInput') createAccountInput: CreateAccountInput): Promise<Account> {
    return this.accountsService.create(createAccountInput);
  }

  @Query(() => [Account])
  async accounts(): Promise<Account[]> {
    return this.accountsService.findAll();
  }

  @Query(() => Account)
  async account(@Args('id') id: number): Promise<Account> {
    return this.accountsService.findOne(id);
  }
  @ResolveReference()
  resolveReference(reference: {__typename: string; id: number}):
  Promise<Account> {
    return this.accountsService.findOne(reference.id);
}}
