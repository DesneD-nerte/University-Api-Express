import { Request, Response, NextFunction } from "express";
import { JwtPayload } from 'jsonwebtoken';
import News from '../models/News';

class NewsController {
    async GetAllNews (req: Request, res: Response, next: NextFunction) {
        const allNews: Array<typeof News> = await News.find({});

        return allNews;
    }
}

export default new NewsController();