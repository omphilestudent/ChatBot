import { Router } from 'express';
import { aiController } from './ai.controller';

export const aiRouter = Router();

aiRouter.post('/learning-suggestions', aiController.learningSuggestions);
aiRouter.post('/debug-hints', aiController.debugHints);
