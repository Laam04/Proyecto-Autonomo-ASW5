import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { CategoriaGasto } from '../../categoria-gastos/entities/categoria-gasto.entity';  // Relación con CategoriaGasto
import { IsDecimal, IsDate, IsNotEmpty } from 'class-validator';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")') 
export class Gasto {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;

  @Column()
  @Field()
  @IsNotEmpty()
  descripcion: string; 

  @Column('float')
  @Field()
  @IsDecimal()
  monto: number;

  @Column()
  @Field()
  @IsDate() 
  fecha: string;

  @ManyToOne(() => CategoriaGasto, categoriaGasto => categoriaGasto.gastos)
  @JoinColumn()
  @Field(type => CategoriaGasto)
  categoriaGasto: CategoriaGasto;
}
