export class UserFilterDto {
    limit: number = 10;
    page: number = 0;

    constructor(limit: number, page: number) {
        this.limit = limit;
        this.page = page;
    }
}