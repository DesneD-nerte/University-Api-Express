export class DeleteArrayNewsDto {
    arrayIdNews: string[]

    constructor(arrayIdNews: string[]) {
        this.arrayIdNews = arrayIdNews;
    }
}