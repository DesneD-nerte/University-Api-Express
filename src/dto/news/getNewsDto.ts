export class GetNewsDto {
    limit: number = 10;
    page: number = 1;

    constructor(limit: number, page: number) {
        this.limit = limit;
        this.page = page;
    }
}