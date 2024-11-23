import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateIngresoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
