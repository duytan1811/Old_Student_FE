import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { ViewState } from '../base/view.state';
import { EventModel } from 'src/app/shared/models/event/event.model';
import { EventService } from '../../services/event/event.service';
import { EventRegisterModel } from '../../models/event/event-register.model';

@Injectable({
  providedIn: 'root',
})
export class EventState implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  private _eventListSubject: BehaviorSubject<Array<EventModel>> =
    new BehaviorSubject(Array());
  public eventList$: Observable<Array<EventModel>> =
    this._eventListSubject.asObservable();

  private _totalEventSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalEvent$: Observable<number> = this._totalEventSubject.asObservable();

  private _eventSubject: BehaviorSubject<EventModel> = new BehaviorSubject(
    Object()
  );
  public event$: Observable<EventModel> = this._eventSubject.asObservable();

  private _eventRegistersSubject: BehaviorSubject<Array<EventRegisterModel>> =
    new BehaviorSubject(Array());
  public eventRegisters$: Observable<Array<EventRegisterModel>> =
    this._eventRegistersSubject.asObservable();

  private _totalCommentSubject: BehaviorSubject<number> =
    new BehaviorSubject(0);
  public totalComment$: Observable<number> =
    this._totalCommentSubject.asObservable();


  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(
    Boolean()
  );
  public isLoading$: Observable<boolean> =
    this._isLoadingSubject.asObservable();

  getEventList(): Array<EventModel> {
    return this._eventListSubject.getValue();
  }

  setEventList(data: Array<EventModel>) {
    this._eventListSubject.next(data);
  }

  getTotalEvent(): number {
    return this._totalEventSubject.getValue();
  }

  setTotalEvent(data: number) {
    this._totalEventSubject.next(data);
  }

  getEvent(): EventModel {
    return this._eventSubject.getValue();
  }

  setEvent(data: EventModel) {
    this._eventSubject.next(data);
  }

  getEventRegisters(): Array<EventRegisterModel> {
    return this._eventRegistersSubject.getValue();
  }

  setEventRegisters(data: Array<EventRegisterModel>) {
    this._eventRegistersSubject.next(data);
  }

  getTotalEventRegisters(): number {
    return this._totalCommentSubject.getValue();
  }

  setTotalEventRegisters(data: number) {
    this._totalCommentSubject.next(data);
  }

  getIsLoading(): boolean {
    return this._isLoadingSubject.getValue();
  }

  setIsLoading(isLoading: boolean) {
    this._isLoadingSubject.next(isLoading);
  }

  constructor(private eventService: EventService, private viewState: ViewState) {
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  public search(dataSearch: any) {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    const sub = this.eventService.search(dataSearch).subscribe({
      next: (res: BaseTableResponse<EventModel>) => {
        this.setIsLoading(false);
        cv.paginator.total = res.total;
        this.setEventList(res.items);
        this.setTotalEvent(res.total);
      },
      error: (err) => {
        this.setIsLoading(false);
        console.log(`Error get events`, err);
      },
    });

    this.unsubscribe.push(sub);
  }

  public findById(id: string | null) {
    this.setIsLoading(true);

    if (id !== null) {
      const sub = this.eventService.findById(id).subscribe({
        next: (res: BaseResponse<EventModel>) => {
          this.setEvent(res.data);
        },
        error: (err) => {
          this.setIsLoading(false);
          console.log(`Error get event`, err);
        },
      });

      this.unsubscribe.push(sub);
    } else {
      this.setEvent(new EventModel());
    }
    this.setIsLoading(false);
  }

  public getEventRegisterList(eventId: string, data: any): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.eventService.getEventRegisters(eventId, data).subscribe({
        next: (result: BaseTableResponse<EventRegisterModel>) => {
          this.setEventRegisters(result.items);
          cv.paginator.total = result.total;
          this.setTotalEventRegisters(result.total);
          resolve(result);
        },
        error: (e) => {
          this.setIsLoading(false);
          resolve(e.error?.message || e);
        },
      });
    });
  }

  public save(obj: EventModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.eventService.save(obj).subscribe({
        next: (result) => {
          this.setIsLoading(false);
          this.search(cv);
          resolve(result);
        },
        error: (e) => {
          this.setIsLoading(false);
          resolve(e.error?.message || e);
        },
      });
    });
  }

  public register(data: any): Promise<any> {
    this.setIsLoading(true);
    return new Promise((resolve) => {
      this.eventService.register(data).subscribe({
        next: (result) => {
          this.setIsLoading(false);
          resolve(result);
        },
        error: (e) => {
          this.setIsLoading(false);
          resolve(e.error?.message || e);
        },
      });
    });
  }

  public update(id: string, obj: EventModel): Promise<any> {
    this.setIsLoading(true);
    return new Promise((resolve) => {
      this.eventService.update(id, obj).subscribe({
        next: (res) => {
          this.setIsLoading(false);
          resolve(res);
        },
        error: (e) => {
          this.setIsLoading(false);
          resolve(e.error?.message || e);
        },
      });
    });
  }

  public delete(id: string): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.eventService.delete(id).subscribe({
        next: (res) => {
          this.search(cv);
          this.setIsLoading(false);
          resolve(res);
        },
        error: (e) => {
          this.setIsLoading(false);
          resolve(e.error?.message || e);
        },
      });
    });
  }

  public exportExcel(): Promise<any> {
    this.setIsLoading(true);
    return new Promise((resolve) => {
      this.eventService.exportExcel().subscribe({
        next: (res) => {
          this.setIsLoading(false);
          resolve(res);
        },
        error: (e) => {
          this.setIsLoading(false);
          resolve(e.error?.message || e);
        },
      });
    })
  }
}
