import { IsString, IsOptional } from 'class-validator';

export class UpdateCategoriaGastoDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  tipo?: string;
}
