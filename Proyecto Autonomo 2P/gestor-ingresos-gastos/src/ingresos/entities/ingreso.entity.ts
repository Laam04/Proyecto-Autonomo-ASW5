import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Ingreso {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
