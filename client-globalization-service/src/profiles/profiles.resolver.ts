import { Resolver, Query, Mutation, Args, ResolveReference } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Mutation(() => Profile)
  async createProfile(@Args('createProfileInput') createProfileInput: CreateProfileInput): Promise<Profile> {
    return this.profilesService.create(createProfileInput);
  }

  @Mutation(() => Profile)
  async updateProfile(
    @Args('id') id: number,
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ): Promise<Profile> {
    return this.profilesService.update(id, updateProfileInput);
  }

  @Query(() => [Profile])
  async profiles(): Promise<Profile[]> {
    return this.profilesService.findAll();
  }

  @Query(() => Profile)
  async profile(@Args('id') id: number): Promise<Profile> {
    return this.profilesService.findOne(id);
  }
  @ResolveReference()
    resolveReference(reference: {__typename: string; id: number}):
    Promise<Profile> {
      return this.profilesService.findOne(reference.id);
  }
}
