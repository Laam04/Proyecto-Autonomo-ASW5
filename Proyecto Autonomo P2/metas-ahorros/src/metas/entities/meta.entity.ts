import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Ahorro } from '../../ahorros/entities/ahorro.entity';
import { HistorialMeta } from '../../historial/entities/historial.entity';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Meta {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  nombre: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field()
  montoObjetivo: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  fechaLimite: Date;

  @Column()
  @Field()
  estado: string;

  @OneToMany(() => Ahorro, ahorro => ahorro.meta)
  @Field(() => [Ahorro], { nullable: true })
  ahorros: Ahorro[];

  @OneToMany(() => HistorialMeta, historialMeta => historialMeta.meta)
  @Field(() => [HistorialMeta], { nullable: true })
  historial: HistorialMeta[];
}
