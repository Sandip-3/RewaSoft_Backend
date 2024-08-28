import { User } from './model';
import { createUserRepo } from './repository';
const UserService = {
  createUser(userData: User) {
    return createUserRepo(userData);
  },
};

export default UserService;
