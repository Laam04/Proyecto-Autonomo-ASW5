import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Meta } from '../../metas/entities/meta.entity';


@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Ahorro {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field()
  monto: number;

  @Column()
  @Field()
  fecha: Date;

  @ManyToOne(() => Meta, meta => meta.ahorros, { nullable: true })
  @Field(() => Meta, { nullable: true })
  meta: Meta;

}
