import { BaseModel } from "../base/base.model";

export class JobModel extends BaseModel {
    title: string = '';
    content: string = '';
    majorId: string = '';
    majorName: string = '';
    startDate: Date;
    startDateFormat: string = '';
    endDate: Date;
    endDateFormat: string = '';
    filePath: string = '';
    fileName: string = '';
}