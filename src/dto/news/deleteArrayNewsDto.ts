export class DeleteArrayNewsDto {
    arrayIdNews: {
        _id: string
    }

    constructor(arrayIdNews: {_id: string}) {
        this.arrayIdNews = arrayIdNews;
    }
}