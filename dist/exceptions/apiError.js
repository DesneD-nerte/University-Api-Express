"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(status, message, errors = []) {
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
    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}
exports.default = ApiError;
