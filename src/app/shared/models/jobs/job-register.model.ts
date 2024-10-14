import { BaseModel } from "../base/base.model";

export class JobRegisterModel extends BaseModel {
    userId: string = '';
    jobId: string = '';
    jobName: string = '';
    fullName: string = '';
    content: string = '';
    fileName: string = '';
    filePath: string = '';
}