import { Request, Response, NextFunction } from "express";
import { DeleteArrayNewsDto } from "../dto/news/deleteArrayNewsDto";
import { GetNewsDto } from "../dto/news/getNewsDto";
import News from '../models/News';
import newsService from "../services/newsService";
import { IBareRequestParams, IBareResponseBody, IBareRequestBody, IBareRequestQuery } from "../types/servicesTypes/types";

class NewsController {
    async GetNews(req: Request<IBareRequestParams, IBareResponseBody, IBareRequestBody, GetNewsDto>, res: Response, next: NextFunction) {
        try {
            const massiveNews = await newsService.GetNews(req.query);
            const range = await News.count();
            res.setHeader('range', range.toString());

            return res.json(massiveNews);
        } catch (err) {
            next(err);
        }
    }

    async GetAllNews (req: Request, res: Response, next: NextFunction) {
        try {
            const allNews = await newsService.GetAllNews();
        
            return res.json(allNews);
        } catch (err) {
            next(err);
        }
    }

    async PostNewNews (req: Request, res: Response, next: NextFunction) {
        try {
            const newCreatedNews = await newsService.PostNewNews(req.body.data);

            return res.json(newCreatedNews);
        } catch (err) {
            next(err);
        }
    }

    async DeleteNews(req: Request<IBareRequestParams, IBareResponseBody, DeleteArrayNewsDto, IBareRequestQuery>, res: Response, next: NextFunction) {
        try {
            const result = await newsService.DeleteNews(req.body.arrayIdNews);

            return res.json(result);
        } catch (err) {
            next(err);
        }
    }
}

export default new NewsController();