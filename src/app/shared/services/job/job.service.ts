import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { APIService } from '../api.service';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';
import { CommentModel } from '../../models/news/comment.model';
import { JobModel } from '../../models/jobs/job.model';
import { JobRegisterModel } from '../../models/jobs/job-register.model';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private apiService: APIService) { }

  search(data: any) {
    return this.apiService.postData<BaseTableResponse<JobModel>>(
      `${EndPointConstants.Job.Index}/search`,
      data
    );
  }

  getUserApplies(jobId: string, data: any) {
    return this.apiService.postData<BaseTableResponse<JobRegisterModel>>(
      `${EndPointConstants.Job.Index}/${jobId}/user-applies`,
      data
    );
  }

  findById(id: string) {
    return this.apiService.getData<BaseResponse<JobModel>>(
      `${EndPointConstants.Job.Index}/${id}`
    );
  }

  save(obj: JobModel) {
    return this.apiService.postData<BaseResponse<JobModel>>(
      `${EndPointConstants.Job.Index}`,
      obj
    );
  }

  update(id: string, obj: JobModel) {
    return this.apiService.putData<BaseResponse<JobModel>>(
      `${EndPointConstants.Job.Index}/${id}`,
      obj
    );
  }

  delete(id: string) {
    return this.apiService.deleteData<BaseResponse<boolean>>(
      `${EndPointConstants.Job.Index}/${id}`
    );
  }

  appllyJob(data: any) {
    const url = EndPointConstants.Job.ApplyJob.replace(':id', data.jobId);
    return this.apiService.postData<BaseResponse<boolean>>(url, data);
  }
}
