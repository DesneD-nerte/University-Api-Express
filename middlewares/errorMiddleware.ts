import { Request, Response } from "express";

import ApiError from "../exceptions/apiError";

module.exports = function(err: Error, req: Request, res: Response, next: any) {
    console.log("error from error Middleware", err.message);

    if(err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors});
    }
    
    return res.status(500).json({message: "Непридвиденная ошибка"});
}