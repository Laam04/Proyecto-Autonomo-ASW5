import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsDecimal, IsString, IsNotEmpty, IsDateString } from 'class-validator';

@InputType()
export class UpdatePagoInput {
  @Field(() => Int)
  id: number;

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
