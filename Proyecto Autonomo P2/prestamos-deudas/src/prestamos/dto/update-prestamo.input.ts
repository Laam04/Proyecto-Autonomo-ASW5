import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsOptional, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class UpdatePrestamoInput {
  @Field(() => Int)
  id: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  monto?: number;

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  fechaInicio?: string;

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  fechaFin?: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  tasaInteres?: number;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  descripcion?: string;
}
