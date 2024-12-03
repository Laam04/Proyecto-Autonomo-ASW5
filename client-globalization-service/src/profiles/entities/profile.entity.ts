import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { Currency } from '../../currencies/entities/currency.entity';
import { ObjectType, Field, Directive, ID, Float } from '@nestjs/graphql'; 

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Profile {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  id: number;

  @ManyToOne(() => Account, { nullable: false })
  @JoinColumn({ name: 'accountId' })
  @Field(type => Account)
  account: Account; 

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column('float')
  @Field(type => Float) 
  balance: number;

  @ManyToOne(() => Currency, { nullable: false })
  @JoinColumn({ name: 'currencyId' })
  @Field(type => Currency)
  currency: Currency; 
}
