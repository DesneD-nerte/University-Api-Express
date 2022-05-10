import { Request, Response, NextFunction } from "express";
import Audience from "../../models/Audience";
import Department from "../../models/Department";
import Faculty from "../../models/Faculty";
import Group from "../../models/Group";
import Lesson from "../../models/Lesson";
import Role from "../../models/Role";

class UnitedAdditionalController {
    async GetAudiences (req: Request, res: Response, next: NextFunction) {
        const arrayAudience = await Audience.find({});
        
        return res.json(arrayAudience);
    }

    async GetLessons (req: Request, res: Response, next: NextFunction) {
        const arrayLesson = await Lesson.find({});

        return res.json(arrayLesson);
    }
    
    async GetFaculties (req: Request, res: Response, next: NextFunction) {
        const arrayFaculty = await Faculty.find({});

        return res.json(arrayFaculty);
    }

    async GetGroups (req: Request, res: Response, next: NextFunction) {
        const arrayGroup = await Group.find({});

        return res.json(arrayGroup);
    }
    
    
    async GetDepartments (req: Request, res: Response, next: NextFunction) {
        const arrayDepartment = await Department.find({});

        return res.json(arrayDepartment);
    }

    async GetRoles (req: Request, res: Response, next: NextFunction) {
        const arrayRole = await Role.find({});

        return res.json(arrayRole);
    }
}

export default new UnitedAdditionalController();