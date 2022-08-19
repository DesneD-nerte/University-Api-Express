import { HydratedDocument } from "mongoose";
import { GetNewsDto } from "../dto/news/getNewsDto";
import News from "../models/News";
import newsRepository from "../repositories/newsRepository";
import { INews } from "../types/modelsTypes";

class NewsService {
    async GetNews(query: GetNewsDto) {
        const massiveNews = await newsRepository.GetNews(query);

        return massiveNews;
    }

    async GetAllNews () {
        const allNews = await newsRepository.GetAllNews();
        
        return allNews;
    }

    async PostNewNews (data: INews) {
        const newCreatedNews = await News.create(data);

        return newCreatedNews;
    }

    async DeleteNews(idNewsArray: string[]) {
        const deleteResult = await newsRepository.DeleteNews(idNewsArray);
        
        return deleteResult;
    }
}

export default new NewsService();