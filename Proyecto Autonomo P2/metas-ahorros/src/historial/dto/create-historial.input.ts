import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsDate } from 'class-validator';

@InputType()
export class CreateHistorialMetaInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  tipoEvento: string; // e.g., "ajuste de meta", "comentario", "estado actualizado"

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @Min(0)
  @IsOptional()
  montoCambiado?: number;

  @Field()
  @IsDate()
  @IsNotEmpty()
  fechaEvento: Date;

  @Field(() => Int)
  @IsNotEmpty()
  metaId: number; // Relación con Meta
}
