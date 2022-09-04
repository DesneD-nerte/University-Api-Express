class MongooseError extends Error {
	status: number;
	errors: Array<Error>;

	constructor(status: number, message: string, errors: Array<Error> = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static ArgumentFormat() {
		return new MongooseError(400, "Неправильный формат Id");
	}
}

export default MongooseError;