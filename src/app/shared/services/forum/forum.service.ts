import { Injectable } from '@angular/core';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { APIService } from '../api.service';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';
import { ForumModel } from '../../models/forum/forum.model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private apiService :APIService) { }

  search(data: any) {
    return this.apiService.postData<BaseTableResponse<ForumModel>>(`${EndPointConstants.Forum.Search}`, data);
  }

}
