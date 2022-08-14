import express from "express";

import authRoutes from '../routes/authRoutes';
import userRoutes from '../routes/userRoutes';
import messageRoutes from '../routes/messageRoutes';
import newsRoutes from '../routes/newsRoutes';
import currentLessonRoutes from '../routes/currentLessonRoutes';
import markRoutes from '../routes/markRoutes';
import lessonRoutes from '../routes/additionalRoutes.ts/lessonRoutes';
import audienceRoutes from '../routes/additionalRoutes.ts/audienceRoutes';
import departmentRoutes from '../routes/additionalRoutes.ts/departmentRoutes';
import facultyRoutes from '../routes/additionalRoutes.ts/facultyRoutes';
import groupRoutes from '../routes/additionalRoutes.ts/groupRoutes';
import roleRoutes from '../routes/additionalRoutes.ts/roleRoutes';

import authMiddleware from "../middlewares/authMiddleware";

import fileController from "../controllers/fileController";
import userController from "../controllers/userController";

const createRoutes = (app: express.Express) => {

    app.use('/api/lessons', lessonRoutes);
    app.use('/api/audiences', audienceRoutes);
    app.use('/api/roles', roleRoutes);
    app.use('/api/groups', groupRoutes);
    app.use('/api/departments', departmentRoutes);
    app.use('/api/faculties', facultyRoutes);

    app.use('/api/auth', authRoutes);

    app.use('/users', authMiddleware, userRoutes);
    app.use('/currentlessons', authMiddleware, currentLessonRoutes);
    app.use('/marks', authMiddleware, markRoutes);
    app.use('/myprofile', authMiddleware, userController.GetMyData)
    app.use('/messages', authMiddleware, messageRoutes);
    app.use('/news', authMiddleware, newsRoutes);


    app.get('/files/getExcelTemplate', authMiddleware, fileController.LoadExcelTemplate);
    app.get('/images/:imageName', fileController.LoadLoginImages);
    app.get('/avatar/:id', fileController.LoadImage);
    app.post('/upload', authMiddleware, fileController.SaveImage);

}

export default createRoutes;
