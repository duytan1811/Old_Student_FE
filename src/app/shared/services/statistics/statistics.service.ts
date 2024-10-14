import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { APIService } from '../api.service';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';
import { EventByMonthModel } from '../../models/statistics/event-by-month.model';

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
}
