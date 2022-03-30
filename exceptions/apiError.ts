class ApiError extends Error {
    status: number;
    errors: Array<Error>;

    constructor(status: number, message: string, errors: Array<Error> = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован');
    }

    static TokenExpired() {
        return new ApiError(401, 'Токен ликвидирован');
    }

    static BadRequest(message: string, errors: any = []) {////////errors: Array<Error>
        return new ApiError(400, message, errors);
    }
}

export = ApiError;