import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsNumber, Min, IsOptional, IsDate } from 'class-validator';

@InputType()
export class UpdateAhorroInput {
  @Field(() => Int)
  @IsOptional()
  id?: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @Min(0)
  @IsOptional()
  monto?: number;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  fecha?: Date;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  metaId?: number; // Relación con Meta
}
