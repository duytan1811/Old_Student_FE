import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { APIService } from '../api.service';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';
import { NewsModel } from '../../models/news/news.model';

@Injectable({
  providedIn: 'root',
})

export class NewsService {

  constructor(private apiService: APIService) {
  }

  search(data: any) {
    return this.apiService.postData<BaseTableResponse<NewsModel>>(`${EndPointConstants.News.Index}/search`, data);
  }

  findById(id: string) {
    return this.apiService.getData<BaseResponse<NewsModel>>(`${EndPointConstants.News.Index}/${id}`);
  }

  save(obj: NewsModel) {
    return this.apiService.postData<BaseResponse<NewsModel>>(`${EndPointConstants.News.Index}`, obj);
  }

  update(id: string, obj: NewsModel) {
    return this.apiService.putData<BaseResponse<NewsModel>>(`${EndPointConstants.News.Index}/${id}`, obj);
  }

  like(id: string) {
    const url=EndPointConstants.News.Like.replace(':id',id);
    return this.apiService.getData<BaseResponse<NewsModel>>(url);
  }

  delete(id: string) {
    return this.apiService.deleteData<BaseResponse<boolean>>(`${EndPointConstants.News.Index}/${id}`);
  }

}
