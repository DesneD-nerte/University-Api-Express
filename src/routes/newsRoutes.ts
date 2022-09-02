import newsController from "../controllers/newsController";

const {Router} = require('express');
const router = Router();

//  '/news'
router.get('/getnews', newsController.GetNews);
router.post('/postnews', newsController.PostNewNews);
router.delete('/deletenews', newsController.DeleteNews);

export default router