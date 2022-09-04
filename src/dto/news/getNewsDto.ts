export class GetNewsDto {
	limit = 10;
	page = 1;

	constructor(limit: number, page: number) {
		this.limit = limit;
		this.page = page;
	}
}