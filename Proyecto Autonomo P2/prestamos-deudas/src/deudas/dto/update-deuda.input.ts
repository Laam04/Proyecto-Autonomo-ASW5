import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsDecimal, IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

@InputType()
export class UpdateDeudaInput {
  @Field(() => Int)
  id: number;

  @Field(() => Float)
  @IsDecimal()
  montoTotal: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @Field()
  @IsDateString()
  fechaCreacion: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  fechaVencimiento: string;
}
