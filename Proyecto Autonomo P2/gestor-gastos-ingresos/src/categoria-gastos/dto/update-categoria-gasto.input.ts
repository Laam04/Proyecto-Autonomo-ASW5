import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateCategoriaGastoInput {
  @Field()
  id: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  nombre: string; 
}
