import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FuenteIngreso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;  
  @Column('text', { nullable: true })
  descripcion: string; 
  @Column()
  tipo: string;  
}
