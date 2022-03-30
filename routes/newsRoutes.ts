import ApiError from "../exceptions/apiError";
import {check} from "express-validator";
import newsController from "../controllers/newsController";

const {Router} = require('express');
const router = Router();

//  '/news'
router.get('/getnews', newsController.GetNews);
router.get('/getallnews', newsController.GetAllNews);
router.post('/postnews', newsController.PostNewNews);
router.delete('/deletenews', newsController.DeleteNews);

module.exports = router;