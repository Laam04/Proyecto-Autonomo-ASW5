import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreateGastoDto {
  @IsString()
  descripcion: string;

  @IsNumber()
  monto: number;

  @IsDate()
  fecha: Date;

  @IsNumber()
  categoriaId: number;
}
