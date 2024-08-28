import { Router } from 'express';

import Health from './Health';
import PostRouter from './Posts';
import UserRouter from './Users';
import AuthRouter from './Auth';
import CommentsRouter from './Comments';

const router = Router();

router.use('/health', Health);
router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/posts/:postId', CommentsRouter);
router.use('/posts', PostRouter);

/**
 * Import and add your routes here
 * Eg:
 *   router.use('/[route-name]', [Route]);
 */

export default router;
