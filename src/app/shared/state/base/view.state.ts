import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';

@Injectable()
export class ViewState {
  private _view: BehaviorSubject<BaseViewModel> = new BehaviorSubject<BaseViewModel>(Object());
  public view$: Observable<BaseViewModel> = this._view.asObservable();

  constructor() {
    this.initViewState();
  }

  public getViewState(): BaseViewModel {
    const viewState = this._view.getValue();
    return viewState;
  }

  public setViewState(viewState: BaseViewModel) {
    this._view.next(viewState);
  }
  
  private initViewState(): void {
    this.setViewState(new BaseViewModel());
  }
}
