import { InputType, Field, } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateFuenteIngresoInput {
  @Field()
  id: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  nombre: string; 
}
