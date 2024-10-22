import { BaseModel } from "../base/base.model";

export class QuestionModel extends BaseModel {
    name: string = '';
    isComment: boolean = false;
}