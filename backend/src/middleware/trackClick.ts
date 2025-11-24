import type { Request, Response, NextFunction } from 'express';
import { UrlModel } from '../models/urlModel.js';

export const trackClick = async (req: Request, _res: Response, next: NextFunction) => {
  const { code } = req.params;
  if (code) {
    try {
      await UrlModel.updateOne(
        { short_code: code },
        { $inc: { clicks: 1 }, $set: { updated_at: new Date() } }
      );
    } catch (error) {
      console.error('Error incrementando click:', error);
    }
  }
  next();
};