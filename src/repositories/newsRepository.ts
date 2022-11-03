import { GetNewsDto } from "../dto/news/getNewsDto";
import News from "../models/News";
import { INews } from "../types/modelsTypes";

class NewsRepository {
	async GetNews(query: GetNewsDto) {
		return await News.find({})
			.sort({ createdAt: -1 })
			.limit(query.limit)
			.skip(query.limit * (query.page - 1));
	}

	async PostNewNews(data: INews) {
		return await News.create(data);
	}

	async DeleteNews(idNewsArray: string[]) {
		return await News.deleteMany({ _id: { $in: idNewsArray } });
	}
}

export default new NewsRepository();
