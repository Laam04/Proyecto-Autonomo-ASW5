import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Account {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @OneToMany(() => Profile, profile => profile.account)
  @Field(type => Profile)
  profiles: Profile;
  
}
