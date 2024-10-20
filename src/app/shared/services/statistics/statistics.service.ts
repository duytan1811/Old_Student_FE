import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { APIService } from '../api.service';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';
import { EventByMonthModel } from '../../models/statistics/event-by-month.model';
import { MemberByMonthModel } from '../../models/statistics/member-by-month.model';
import { NewsByMonthModel } from '../../models/statistics/news-by-month.model';
import { StudentByMajorModel } from '../../models/statistics/student-by-major.model';
import { StudentByYearModel } from '../../models/statistics/student-by-year.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private apiService: APIService) {}

  getEventByMonth() {
    return this.apiService.getData<BaseResponse<Array<EventByMonthModel>>>(
      `${EndPointConstants.Statistics.EventByMonth}`
    );
  }

  getMemberByMonth() {
    return this.apiService.getData<BaseResponse<Array<MemberByMonthModel>>>(
      `${EndPointConstants.Statistics.MemberByMonth}`
    );
  }

  getNewsByMonth() {
    return this.apiService.getData<BaseResponse<Array<NewsByMonthModel>>>(
      `${EndPointConstants.Statistics.NewsByMonth}`
    );
  }

  getStudentByMajor() {
    return this.apiService.getData<BaseResponse<Array<StudentByMajorModel>>>(
      `${EndPointConstants.Statistics.StudentByMajor}`
    );
  }

  getStudentByYear() {
    return this.apiService.getData<BaseResponse<Array<StudentByYearModel>>>(
      `${EndPointConstants.Statistics.StudentByYear}`
    );
  }
}
