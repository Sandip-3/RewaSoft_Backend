import { User, UserDocument, UserModel } from './model';

export const createUserRepo = (userData: User): Promise<UserDocument> => {
  const user = new UserModel(userData);
  return user.save();
};
