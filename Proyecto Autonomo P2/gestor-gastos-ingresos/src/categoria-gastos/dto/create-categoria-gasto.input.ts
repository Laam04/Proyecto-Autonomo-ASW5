import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCategoriaGastoInput {
  @Field()
  @IsNotEmpty()
  nombre: string;
}