import { IsString, IsOptional } from 'class-validator';

export class CreateCategoriaGastoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsString()
  tipo: string;
}
