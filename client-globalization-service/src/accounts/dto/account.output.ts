import { ObjectType, Field } from '@nestjs/graphql';
import { Profile } from '../../profiles/entities/profile.entity';

@ObjectType()
export class AccountOutput {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => [Profile])
  profiles: Profile[];
}
