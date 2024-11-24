import { IsString, IsOptional } from 'class-validator';

export class CreateFuenteIngresoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsString()
  tipo: string;
}
