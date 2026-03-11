import { Request, Response } from 'express';
import { z } from 'zod';
import { aiService } from './ai.service';

const learningSchema = z.object({
  code: z.string().min(1),
  language: z.string().min(1).default('javascript')
});

const debugSchema = z.object({
  error: z.string().min(1),
  context: z.object({
    code: z.string().optional(),
    filePath: z.string().optional()
  }).optional()
});

export const aiController = {
  learningSuggestions: async (req: Request, res: Response) => {
    const parsed = learningSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: 'Invalid payload', issues: parsed.error.issues });
    }

    const data = await aiService.getLearningSuggestions(parsed.data.code, parsed.data.language);
    return res.status(200).json(data);
  },

  debugHints: async (req: Request, res: Response) => {
    const parsed = debugSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: 'Invalid payload', issues: parsed.error.issues });
    }

    const data = await aiService.getDebugHints(parsed.data.error, parsed.data.context);
    return res.status(200).json(data);
  }
};
