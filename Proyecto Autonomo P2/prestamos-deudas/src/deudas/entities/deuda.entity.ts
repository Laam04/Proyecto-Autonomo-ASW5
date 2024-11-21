import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, Float, Directive, ID} from '@nestjs/graphql';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Deuda {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column('decimal', { precision: 10, scale: 2 }) 
  @Field(() => Float)
  montoTotal: number;

  @Column()
  @Field()
  descripcion: string;

  @Column({ type: 'date' })
  @Field()
  fechaCreacion: string;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  fechaVencimiento: string;
}
