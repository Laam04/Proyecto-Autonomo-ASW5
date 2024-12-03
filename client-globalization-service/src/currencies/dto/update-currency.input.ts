import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateCurrencyInput } from './create-currency.input';

@InputType()
export class UpdateCurrencyInput extends PartialType(CreateCurrencyInput) {
  @Field(() => Int)
  id: number;
}
