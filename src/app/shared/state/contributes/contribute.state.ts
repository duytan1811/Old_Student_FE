import {  Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { ViewState } from '../base/view.state';
import { BaseTableResponse } from '../../models/base/base-table-response.model';
import { ContributeModel } from '../../models/contributes/contribute.model';
import { ContributeService } from '../../services/contributes/contribute.service';

@Injectable({
  providedIn: 'root',
})
export class ContributeState implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  private _contributesSubject: BehaviorSubject<Array<ContributeModel>> = new BehaviorSubject(Array());
  public contributes$: Observable<Array<ContributeModel>> = this._contributesSubject.asObservable();

  private _totalContributeSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalContribute$: Observable<number> = this._totalContributeSubject.asObservable();

  private _contributeSubject: BehaviorSubject<ContributeModel> = new BehaviorSubject(Object());
  public contribute$: Observable<ContributeModel> = this._contributeSubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(Boolean());
  public isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();

  getContributes(): Array<ContributeModel> {
    return this._contributesSubject.getValue();
  }

  setContributes(data: Array<ContributeModel>) {
    this._contributesSubject.next(data);
  }

  getTotalContribute(): number {
    return this._totalContributeSubject.getValue();
  }

  setTotalContribute(data: number) {
    this._totalContributeSubject.next(data);
  }

  getContribute(): ContributeModel {
    return this._contributeSubject.getValue();
  }

  setContribute(data: ContributeModel) {
    this._contributeSubject.next(data);
  }

  getIsLoading(): boolean {
    return this._isLoadingSubject.getValue();
  }

  setIsLoading(isLoading: boolean) {
    this._isLoadingSubject.next(isLoading);
  }

  constructor(
    private contributeService: ContributeService,
    private viewState: ViewState,
  ) {

  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  public search(dataSearch: any) {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    const sub = this.contributeService.search(dataSearch).subscribe({
      next: (res: BaseTableResponse<ContributeModel>) => {
        this.setIsLoading(false);
        cv.paginator.total = res.total;
        this.setContributes(res.items);
        this.setTotalContribute(res.total);
      },
      error: (err) => {
        this.setIsLoading(false);
        console.log(`Error get contributes`, err)
      }
    })

    this.unsubscribe.push(sub);
  }

  public findById(id: string | null) {
    this.setIsLoading(true);

    if (id) {
      const sub = this.contributeService.findById(id).subscribe({
        next: (res: BaseResponse<ContributeModel>) => {
          this.setContribute(res.data);
        },
        error: (err) => {
          this.setIsLoading(false);
          console.log(`Error get contribute`, err)
        }
      })

      this.unsubscribe.push(sub);
    } else {
      this.setContribute(new ContributeModel());
    }
    this.setIsLoading(false);
  }

  public save(obj: ContributeModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.contributeService.save(obj).subscribe({
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
    })
  }

  public update(id: string, obj: ContributeModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.contributeService.update(id, obj).subscribe({
        next: (res) => {
          this.setIsLoading(false);
          this.search(cv);
          resolve(res);
        },
        error: (e) => {
          this.setIsLoading(false);
          resolve(e.error?.message || e);
        },
      });
    })
  }

  public delete(id: string): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.contributeService.delete(id).subscribe({
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
    })
  }
}
