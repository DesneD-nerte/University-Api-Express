export class UserFilterDto {
	limit = 10;
	page = 0;

	constructor(limit: number, page: number) {
		this.limit = limit;
		this.page = page;
	}
}