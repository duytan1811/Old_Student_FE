import { BaseModel } from "../base/base.model";

export class SurveyTemplateModel extends BaseModel {
    name: string = '';
    questionIds: Array<string> = [];
}