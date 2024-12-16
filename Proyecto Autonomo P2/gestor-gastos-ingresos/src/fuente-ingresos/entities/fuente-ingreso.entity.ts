import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ingreso } from '../../ingresos/entities/ingreso.entity';
import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")') 
export class FuenteIngreso {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;

  @Column()
  @Field()
  @IsString()
  @IsNotEmpty()
  nombre: string; 

  @OneToMany(() => Ingreso, (ingreso) => ingreso.fuenteIngreso)
  @Field(type => [Ingreso])
  ingresos: Ingreso[]; 
}
