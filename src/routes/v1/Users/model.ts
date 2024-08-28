import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import CustomError from '../../../utils/Error';
import { UserRoles } from '../../../enums/user-roles.enums';

export interface User {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export const userPrivateFields = ['password', '__v', 'createdAt', 'updatedAt'];

export interface UserDocument extends Document, User {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is Required'],
      unique: false,
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
    },
    role: {
      type: String,
      required: false,
      enum: Object.values(UserRoles),
      default: UserRoles.USER,
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
      unique: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    if (err instanceof Error) next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
  if (!this.password) throw new CustomError('Invalid password or email', 401);
  return await bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<UserDocument>('user', userSchema);
