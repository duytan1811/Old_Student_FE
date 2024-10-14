import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { APIService } from '../api.service';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { EndPointConstants } from 'src/app/shared/constants/end-point-constants';
import { EventModel } from '../../models/event/event.model';
import { EventRegisterModel } from '../../models/event/event-register.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private apiService: APIService) { }

  search(data: any) {
    return this.apiService.postData<BaseTableResponse<EventModel>>(
      `${EndPointConstants.Event.Index}/search`,
      data
    );
  }

  findById(id: string) {
    return this.apiService.getData<BaseResponse<EventModel>>(
      `${EndPointConstants.Event.Index}/${id}`
    );
  }

  getEventRegisters(eventId: string, data: any) {
    const url = EndPointConstants.Event.UserRegister.replace(
      ':id', eventId
    );
    return this.apiService.postData<BaseTableResponse<EventRegisterModel>>(url,data);
  }

  save(obj: EventModel) {
    return this.apiService.postData<BaseResponse<EventModel>>(
      `${EndPointConstants.Event.Index}`,
      obj
    );
  }

  update(id: string, obj: EventModel) {
    return this.apiService.putData<BaseResponse<EventModel>>(
      `${EndPointConstants.Event.Index}/${id}`,
      obj
    );
  }

  register(data: any) {
    const url = EndPointConstants.Event.Register.replace(':id', data.eventId);
    return this.apiService.postData<BaseResponse<boolean>>(url, data);
  }

  delete(id: string) {
    return this.apiService.deleteData<BaseResponse<boolean>>(
      `${EndPointConstants.Event.Index}/${id}`
    );
  }
}
