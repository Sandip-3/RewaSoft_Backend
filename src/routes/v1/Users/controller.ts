import { Response, Request } from 'express';
import { User } from './model';
import UserService from './service';
import { successResponse } from '../../../utils/HttpResponse';
import { messages } from '../../../utils/Messages';
import { NextFunction } from 'express';

const UserController = {
  async createUser(req: Request<unknown, unknown, User>, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const result = await UserService.createUser(body);
      return successResponse({
        response: res,
        message: messages.user.creation_success,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default UserController;
