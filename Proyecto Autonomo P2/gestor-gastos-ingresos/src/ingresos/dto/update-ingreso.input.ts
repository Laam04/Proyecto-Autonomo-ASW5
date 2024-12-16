import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsDecimal } from 'class-validator';

@InputType()
export class UpdateIngresoInput {
  @Field()
  id: number;

  @Field()
  @IsNotEmpty()
  nombre: string;

  @Field()
  @IsDecimal()
  monto: number;

  @Field()
  @IsNotEmpty()
  fecha: string;  

  @Field()
  fuenteIngresoId: number;  
}
