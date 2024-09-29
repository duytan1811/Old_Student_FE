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
    return this.apiService.postData<BaseTableResponse<StudentAchievementModel>>(`${EndPointConstants.StudentAchievement.Index}/search`, data);
  }

  findById(id: string) {
    return this.apiService.getData<BaseResponse<StudentAchievementModel>>(`${EndPointConstants.StudentAchievement.Index}/${id}`);
  }

  save(obj: StudentAchievementModel) {
    return this.apiService.postData<BaseResponse<StudentAchievementModel>>(`${EndPointConstants.StudentAchievement.Index}`, obj);
  }

  update(id: string, obj: StudentAchievementModel) {
    return this.apiService.putData<BaseResponse<StudentAchievementModel>>(`${EndPointConstants.StudentAchievement.Index}/${id}`, obj);
  }

  delete(id: string) {
    return this.apiService.deleteData<BaseResponse<boolean>>(`${EndPointConstants.StudentAchievement.Index}/${id}`);
  }

}
