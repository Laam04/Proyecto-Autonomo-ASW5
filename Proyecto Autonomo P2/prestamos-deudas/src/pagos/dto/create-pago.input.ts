import { InputType, Field, Float } from '@nestjs/graphql';
import { IsDecimal, IsString, IsNotEmpty, IsDateString } from 'class-validator';

@InputType()
export class CreatePagoInput {
  @Field(() => Float)
  @IsDecimal()
  monto: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @Field()
  @IsDateString()
  fechaPago: string;

  @Field()
  @IsDateString()
  fechaVencimiento: string;
}
