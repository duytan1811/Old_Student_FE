import { BaseModel } from "../base/base.model";

export class CommentModel  extends BaseModel{
  userId: string = '';
  createdByName: string = '';
  userAvatar: string = '';
  content: string = '';
}
