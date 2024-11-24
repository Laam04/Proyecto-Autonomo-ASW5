import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingresos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column('decimal')
  monto: number;

  @Column()
  fecha: Date;

  @Column()
  fuenteIngresoId: number;  // Relación con la fuente de ingreso
}
