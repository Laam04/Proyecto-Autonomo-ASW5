import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber, Min, IsDate } from 'class-validator';

@InputType()
export class UpdateMetaInput {
  @Field(() => Int)
  @IsOptional()
  id?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  nombre?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @Min(0)
  @IsOptional()
  montoObjetivo?: number;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  fechaLimite?: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  estado?: string;
}
