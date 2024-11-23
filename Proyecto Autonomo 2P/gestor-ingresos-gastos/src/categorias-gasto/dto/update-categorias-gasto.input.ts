import { CreateCategoriasGastoInput } from './create-categorias-gasto.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoriasGastoInput extends PartialType(CreateCategoriasGastoInput) {
  @Field(() => Int)
  id: number;
}
