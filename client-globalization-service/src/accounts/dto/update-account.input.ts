import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateAccountInput {
  @Field(() => Int)
  @IsOptional()
  id?: number;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string;
}
