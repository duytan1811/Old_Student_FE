import { BaseModel } from "../base/base.model";

export class StudentAchievementModel extends BaseModel {
    name: string = '';
    description: string | null;
    fromDate: Date | null;
    toDate: Date | null;
}