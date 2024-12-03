import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsNumber, Min, IsNotEmpty, IsDate, IsOptional } from 'class-validator';

@InputType()
export class CreateAhorroInput {
  @Field(() => Float)
  @IsNumber()
  @Min(0)
  monto: number;

  @Field()
  @IsDate()
  @IsNotEmpty()
  fecha: Date;

  @Field(() => Int)
  @IsNotEmpty()
  metaId: number; // Relación con Meta
}
