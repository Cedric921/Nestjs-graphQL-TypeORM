import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../models/User';
import { users } from 'src/__mocks__/mocksUsers';
import { UserSetting } from '../models/UserSetting';
import { settings } from 'src/__mocks__/mockSettings';

export let incrementId = users.length;

@Resolver((of) => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return users.find((u) => u.id === id);
  }

  @Query(() => [User])
  getUsers() {
    return users;
  }

  @ResolveField(() => UserSetting, { name: 'settings', nullable: true })
  getUserSettings(@Parent() user: User) {
    return settings.find((stn) => stn.userId === user.id);
  }

  // Mutations
  @Mutation(() => User)
  createUser(
    @Args('username') username: string,
    @Args('displayName', { nullable: true }) displayName: string,
  ) {
    //
    const newUser = { username, displayName, id: ++incrementId };
    users.push(newUser);
    return newUser;
  }
}
