import { Request, Response, NextFunction } from "express";
import { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';

class UserController {
    async getNameAndRoles (req: Request, res: Response, next: NextFunction) {//Здесь мы получаем наш токен
        console.log(req.body.user);

        const usernameFromToken = req.body.user.username;
        
        const myProfileMongo = await User.findOne({username: usernameFromToken});
        
        const {username, name, roles} = myProfileMongo;

        return res.json({username, name, roles});
    }
}

export default new UserController();