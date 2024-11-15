import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Max, IsDate } from 'class-validator';

@InputType()
export class CreateMetaInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  montoObjetivo: number;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  fechaLimite?: Date;

  @Field()
  @IsString()
  @IsNotEmpty()
  estado: string; // e.g., "en progreso", "completada", "cancelada"
}
