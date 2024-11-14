import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, Int, Float, Directive, ID } from '@nestjs/graphql';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Prestamo {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('decimal', { precision: 10, scale: 2 }) 
  @Field()
  monto: number;

  @Column({ type: 'date' })
  @Field()
  fechaInicio: string;

  @Column({ type: 'date' })
  @Field()
  fechaFin: string;

  @Column('decimal', { precision: 5, scale: 2 })
  @Field()
  tasaInteres: number;

  @Column()
  @Field()
  descripcion: string;
}

