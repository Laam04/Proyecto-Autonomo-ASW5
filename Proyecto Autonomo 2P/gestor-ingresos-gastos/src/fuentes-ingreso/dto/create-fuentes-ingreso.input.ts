import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFuentesIngresoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
