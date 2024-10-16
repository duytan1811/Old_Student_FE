import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { APIService } from '../api.service';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';
import { EventByMonthModel } from '../../models/statistics/event-by-month.model';
import { MemberByMonthModel } from '../../models/statistics/member-by-month.model';
import { NewsByMonthModel } from '../../models/statistics/news-by-month.model';

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
}
