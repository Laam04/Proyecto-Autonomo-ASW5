import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gastos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column('decimal')
  monto: number;

  @Column()
  fecha: Date;

  @Column()
  categoriaId: number;  // Relación con categoría de gasto
}
