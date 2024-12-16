import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Gasto } from '../../gastos/entities/gasto.entity';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")') 
export class CategoriaGasto {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;

  @Column()
  @Field()
  @IsNotEmpty()
  nombre: string; 

  @OneToMany(() => Gasto, (gasto) => gasto.categoriaGasto)
  @Field(type => [Gasto])
  gastos: Gasto[];
}
