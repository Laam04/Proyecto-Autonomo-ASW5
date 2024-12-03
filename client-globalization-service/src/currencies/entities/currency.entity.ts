import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")') 
export class Currency {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  code: string;

  @Column()
  @Field()
  symbol: string;

  @OneToMany(() => Profile, profile => profile.currency)
  @Field(type => [Profile])
  profiles: Profile[];
}
