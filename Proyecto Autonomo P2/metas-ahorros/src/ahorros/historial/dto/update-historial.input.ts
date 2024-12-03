import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber, Min, IsDate } from 'class-validator';

@InputType()
export class UpdateHistorialMetaInput {
  @Field(() => Int)
  @IsOptional()
  id?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  tipoEvento?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @Min(0)
  @IsOptional()
  montoCambiado?: number;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  fechaEvento?: Date;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  metaId?: number; // Relación con Meta
}
