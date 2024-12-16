import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsDecimal } from 'class-validator';

@InputType()
export class UpdateGastoInput {
  @Field()
  id: number;

  @Field()
  @IsNotEmpty()
  descripcion: string;

  @Field()
  @IsDecimal()
  monto: number;

  @Field()
  @IsNotEmpty()
  fecha: string; 

  @Field()
  categoriaGastoId: number; 
}
