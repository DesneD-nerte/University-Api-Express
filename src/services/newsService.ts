import { HydratedDocument } from "mongoose";
import { GetNewsDto } from "../dto/news/getNewsDto";
import News from "../models/News";
import { INews } from "../types/modelsTypes";

class NewsService {
    //SORT {createdAt: -1} Задом наперед приходят данные
    async GetNews(query: GetNewsDto) {
        const { limit, page } = query;

        const massiveNews = await News.find({}).sort({createdAt: -1})
            .limit(limit)
            .skip(limit * (page - 1));

        return massiveNews;
    }

    async GetAllNews () {
        const allNews: Array<HydratedDocument<INews>> = await News.find({}).sort({createdAt: -1});
        
        return allNews;
    }

    async PostNewNews (data: INews) {
        const newCreatedNews = await News.create(data);

        return newCreatedNews;
    }

    async DeleteNews(dataArray: any) {
        return await News.deleteMany({_id: {$in: dataArray}})
    }
}

export default new NewsService();