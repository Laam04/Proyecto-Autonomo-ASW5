import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Meta } from '../../metas/entities/meta.entity';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class HistorialMeta {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  tipoEvento: string; // e.g., "ajuste de meta", "comentario", "estado actualizado"

  @Column({ nullable: true })
  @Field({ nullable: true })
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  @Field({ nullable: true })
  montoCambiado: number;

  @Column()
  @Field()
  fechaEvento: Date;

  @ManyToOne(() => Meta, meta => meta.historial)
  @Field(() => Meta)
  meta: Meta;

}
