import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { FuenteIngreso } from '../../fuente-ingresos/entities/fuente-ingreso.entity';  
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { IsNotEmpty, IsDecimal, IsDate } from 'class-validator';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Ingreso {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;

  @Column()
  @Field()
  @IsNotEmpty()
  nombre: string;

  @Column('float')
  @Field()
  @IsDecimal()
  monto: number;

  @Column()
  @Field()
  @IsDate()
  fecha: string; 

  @ManyToOne(() => FuenteIngreso, fuenteIngreso => fuenteIngreso.ingresos)
  @JoinColumn()
  @Field(type => FuenteIngreso)
  fuenteIngreso: FuenteIngreso;
}
