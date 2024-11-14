import { InputType, Field, Float } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';

@InputType()
export class CreatePrestamoInput {
  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  monto: number;

  @Field()
  @IsDateString()
  @IsNotEmpty()
  fechaInicio: string;

  @Field()
  @IsDateString()
  @IsNotEmpty()
  fechaFin: string;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  tasaInteres: number;

  @Field()
  @IsNotEmpty()
  descripcion: string;
}
