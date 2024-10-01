import { BaseModel } from '../base/base.model';

export class ForumModel extends BaseModel {
  type: string = '';
  typeName: string = '';
  createdByName: string = '';
  createdByAvatar: string = '';
  content: string = '';
  countLike: number = 0;
  countComment: number = 0;
  isLiked:boolean=false;
}
