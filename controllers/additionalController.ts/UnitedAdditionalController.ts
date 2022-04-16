import { Request, Response, NextFunction } from "express";
import Audience from "../../models/Audience";
import Department from "../../models/Department";
import Faculty from "../../models/Faculty";
import Group from "../../models/Group";
import Lesson from "../../models/Lesson";
import Role from "../../models/Role";

class UnitedAdditionalController {
    async getAudiences (req: Request, res: Response, next: NextFunction) {
        const arrayAudience = await Audience.find({});
        console.log(arrayAudience);
        return res.json(arrayAudience);
    }

    async getLessons (req: Request, res: Response, next: NextFunction) {
        const arrayLesson = await Lesson.find({});
        console.log(arrayLesson);
        return res.json(arrayLesson);
    }
    
    async getFaculties (req: Request, res: Response, next: NextFunction) {
        const arrayFaculty = await Faculty.find({});
        console.log(arrayFaculty);
        return res.json(arrayFaculty);
    }

    async getGroups (req: Request, res: Response, next: NextFunction) {
        const arrayGroup = await Group.find({});
        console.log(arrayGroup);
        return res.json(arrayGroup);
    }
    
    
    async getDepartments (req: Request, res: Response, next: NextFunction) {
        const arrayDepartment = await Department.find({});
        console.log(arrayDepartment);
        return res.json(arrayDepartment);
    }

    async getRoles (req: Request, res: Response, next: NextFunction) {
        const arrayRole = await Role.find({});
        console.log(arrayRole);
        return res.json(arrayRole);
    }
}

export default new UnitedAdditionalController();