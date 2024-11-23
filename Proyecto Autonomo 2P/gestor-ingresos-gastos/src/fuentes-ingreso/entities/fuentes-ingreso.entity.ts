import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FuentesIngreso {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
