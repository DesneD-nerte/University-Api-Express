import { Request, Response, NextFunction } from "express";
import { JwtPayload } from 'jsonwebtoken';
import News from '../models/News';

class NewsController {
    //SORT {createdAt: -1} Задом наперед приходят данные
    async GetNews(req: Request, res: Response, next: NextFunction) {
        console.log("Get News method.");

        const limit = Number.parseInt(req.query.limit?.toString()!) || 10; 
        const page = Number.parseInt(req.query.page?.toString()!) || 1; 

        const massiveNews = await News.find({}).sort({createdAt: -1})
        .limit(limit)
        .skip(limit * (page - 1));//Если хотим показывать 11-20, нужно скипать первый показанных и переходить на нужную страницу

        return res.json(massiveNews);
    }

    async GetAllNews (req: Request, res: Response, next: NextFunction) {
        const allNews: Array<typeof News> = await News.find({}).sort({createdAt: -1});
        
        return res.json(allNews);
    }

    async PostNewNews (req: Request, res: Response, next: NextFunction) {
        const newNews = req.body.data.newNews;

        News.create(newNews)
        .then(response => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(400);
        })  
    }

    async DeleteNews(req: Request, res: Response, next: NextFunction) {
        const arrayToDelete: Array<typeof News> = req.body.oldNews;

        for (let i = 0; i < arrayToDelete.length; i++) {
            await News.deleteOne(arrayToDelete[i]);
        }

        return res.sendStatus(200);
    }
}

export default new NewsController();