import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoriasGastoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
