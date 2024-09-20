import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { APIService } from '../api.service';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';
import { StudentModel } from '../../models/students/student.model';

@Injectable({
  providedIn: 'root',
})

export class StudentService {

  constructor(private apiService: APIService) {
  }

  search(data: any) {
    return this.apiService.postData<BaseTableResponse<StudentModel>>(`${EndPointConstants.Student}/search`, data);
  }

  findById(id: string) {
    return this.apiService.getData<BaseResponse<StudentModel>>(`${EndPointConstants.Student}/${id}`);
  }

  save(obj: StudentModel) {
    return this.apiService.postData<BaseResponse<StudentModel>>(`${EndPointConstants.Student}`, obj);
  }

  update(id: string, obj: StudentModel) {
    return this.apiService.putData<BaseResponse<StudentModel>>(`${EndPointConstants.Student}/${id}`, obj);
  }

  delete(id: string) {
    return this.apiService.deleteData<BaseResponse<boolean>>(`${EndPointConstants.Student}/${id}`);
  }

}
