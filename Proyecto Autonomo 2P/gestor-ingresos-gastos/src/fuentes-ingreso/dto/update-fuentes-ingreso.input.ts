import { CreateFuentesIngresoInput } from './create-fuentes-ingreso.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFuentesIngresoInput extends PartialType(CreateFuentesIngresoInput) {
  @Field(() => Int)
  id: number;
}
