import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from '../models/User';
import { users } from 'src/__mocks__/mocksUsers';

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return users.find((u) => u.id === id);
  }

  @Query(() => [User])
  getUsers() {
    return users;
  }
}
