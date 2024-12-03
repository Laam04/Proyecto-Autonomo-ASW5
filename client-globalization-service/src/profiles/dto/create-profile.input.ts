import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsString, IsEmail } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field(type => Int)
  accountId: number;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(type => Float) 
  balance: number;

  @Field(type => Int)
  currencyId: number;
}

@InputType()
export class UpdateProfileInput {
  @Field(type => Int)
  accountId: number;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field(type => Float)  
  balance: number;

  @Field(type => Int)
  currencyId: number;
}
