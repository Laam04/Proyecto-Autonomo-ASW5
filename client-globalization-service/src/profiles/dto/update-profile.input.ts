import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsEmail, IsOptional, IsDecimal } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email: string;

  @Field({ nullable: true })
  @IsDecimal()
  @IsOptional()
  balance: number;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  accountId: number;

  @Field(type => Int, { nullable: true })
  @IsOptional()
  currencyId: number;
}
