import { Router } from 'express';
import UserController from './controller';

const UserRouter = Router();


// Create new user
UserRouter.route('/').post(UserController.createUser);

export default UserRouter;
