import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { SettingModel } from 'src/app/shared/models/settings/setting.model';
import { SettingService } from 'src/app/shared/services/setting/setting.service';
import { ViewState } from '../base/view.state';


@Injectable()
export class SettingState implements OnDestroy {
  private subs: Array<Subscription> = [];

  private _settingsSubject: BehaviorSubject<Array<SettingModel>> = new BehaviorSubject(Array());
  public settings$: Observable<Array<SettingModel>> = this._settingsSubject.asObservable();

  private _settingSubject: BehaviorSubject<SettingModel> = new BehaviorSubject(Object());
  public setting$: Observable<SettingModel> = this._settingSubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(Boolean());
  public isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();

  getSettings(): Array<SettingModel> {
    return this._settingsSubject.getValue();
  }

  setSettings(data: Array<SettingModel>) {
    this._settingsSubject.next(data);
  }


  getSetting(): SettingModel {
    return this._settingSubject.getValue();
  }

  setSetting(data: SettingModel) {
    this._settingSubject.next(data);
  }

  getIsLoading(): boolean {
    return this._isLoadingSubject.getValue();
  }

  setIsLoading(isLoading: boolean) {
    this._isLoadingSubject.next(isLoading);
  }

  constructor(
    private settingService: SettingService,
    private viewState: ViewState) {
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public getSettingAll() {
    const sub = this.settingService.getAll().subscribe({
      next: (res: BaseResponse<Array<SettingModel>>) => {
        if (res && res.data) { }
        this.setSettings(res.data);
      },
      error: (err) => {
        console.log(`Get settings error: ${err}`);
      }
    });

    this.subs.push(sub);
  }

  public getSettingByType(type: string) {
    const sub = this.settingService.getSettingByType(type).subscribe({
      next: (res: BaseResponse<Array<SettingModel>>) => {
        if (res && res.data) { }
        this.setSettings(res.data);
      },
      error: (err) => {
        console.log(`Get setting types error: ${err}`);
      }
    });

    this.subs.push(sub);
  }

  public getSettingByKey(key: string) {
    const sub = this.settingService.getSettingByKey(key).subscribe({
      next: (res: BaseResponse<SettingModel>) => {
        if (res && res.data) { }
        this.setSetting(res.data);
      },
      error: (err) => {
        console.log(`Get setting error: ${err}`);
      }
    });

    this.subs.push(sub);
  }

  public updateSettings(data: any): Promise<any> {
    this.setIsLoading(true);
    return new Promise((resolve) => {
      this.settingService.updateSettings(data).subscribe({
        next: (result) => {
          this.setIsLoading(false);
          resolve(result);
        },
        error: (e) => {
          this.setIsLoading(false);
          resolve(e.error?.message || e);
        },
      });
    })
  }
}
