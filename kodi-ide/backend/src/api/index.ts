import { Router } from 'express';
import { aiRouter } from './ai/ai.routes';

export const apiRouter = Router();

apiRouter.use('/ai', aiRouter);
