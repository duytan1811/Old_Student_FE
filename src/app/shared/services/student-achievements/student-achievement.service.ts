import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { APIService } from '../api.service';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';
import { StudentAchievementModel } from '../../models/student-achivements/student-achievement.model';

@Injectable({
  providedIn: 'root',
})

export class StudentAchievementService {

  constructor(private apiService: APIService) {
  }

  search(data: any) {
    return this.apiService.postData<BaseTableResponse<StudentAchievementModel>>(`${EndPointConstants.StudentAchievement}/search`, data);
  }

  findById(id: string) {
    return this.apiService.getData<BaseResponse<StudentAchievementModel>>(`${EndPointConstants.StudentAchievement}/${id}`);
  }

  save(obj: StudentAchievementModel) {
    return this.apiService.postData<BaseResponse<StudentAchievementModel>>(`${EndPointConstants.StudentAchievement}`, obj);
  }

  update(id: string, obj: StudentAchievementModel) {
    return this.apiService.putData<BaseResponse<StudentAchievementModel>>(`${EndPointConstants.StudentAchievement}/${id}`, obj);
  }

  delete(id: string) {
    return this.apiService.deleteData<BaseResponse<boolean>>(`${EndPointConstants.StudentAchievement}/${id}`);
  }

}
