import ApiError from "../exceptions/apiError";
import {check} from "express-validator";
import newsController from "../controllers/newsController";

const {Router} = require('express');
const router = Router();

//  '/news'
router.get('/getnews', newsController.GetAllNews)


module.exports = router;