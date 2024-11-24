import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class UpdateGastoDto {
  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  monto?: number;

  @IsOptional()
  @IsDate()
  fecha?: Date;

  @IsOptional()
  @IsNumber()
  categoriaId?: number;
}
