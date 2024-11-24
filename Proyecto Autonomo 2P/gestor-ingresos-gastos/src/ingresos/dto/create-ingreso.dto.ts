import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateIngresoDto {
  @IsString()
  descripcion: string;

  @IsNumber()
  monto: number;

  @IsDate()
  fecha: Date;

  @IsNumber()
  fuenteIngresoId: number;
}
