import { CreateIngresoInput } from './create-ingreso.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateIngresoInput extends PartialType(CreateIngresoInput) {
  @Field(() => Int)
  id: number;
}
