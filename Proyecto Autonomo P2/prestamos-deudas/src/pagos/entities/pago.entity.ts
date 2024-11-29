import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID, Float, Directive } from '@nestjs/graphql';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Pago {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float)
  monto: number;

  @Column({ type: 'date' })
  @Field()
  fechaPago: string;

  @Column()
  @Field()
  descripcion: string;

  @Column({ type: 'date' })
  @Field()
  fechaVencimiento: string;
}
