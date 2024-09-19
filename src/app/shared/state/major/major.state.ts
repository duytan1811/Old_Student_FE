import {  Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { MajorService } from 'src/app/shared/services';
import { ViewState } from '../base/view.state';
import { MajorModel } from 'src/app/shared/models/major/major.model';
import { BaseTableResponse } from '../../models/base/base-table-response.model';

@Injectable({
  providedIn: 'root',
})
export class MajorState implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  private _majorsSubject: BehaviorSubject<Array<MajorModel>> = new BehaviorSubject(Array());
  public majors$: Observable<Array<MajorModel>> = this._majorsSubject.asObservable();

  private _totalMajorSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalMajor$: Observable<number> = this._totalMajorSubject.asObservable();

  private _majorSubject: BehaviorSubject<MajorModel> = new BehaviorSubject(Object());
  public major$: Observable<MajorModel> = this._majorSubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(Boolean());
  public isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();

  getMajors(): Array<MajorModel> {
    return this._majorsSubject.getValue();
  }

  setMajors(data: Array<MajorModel>) {
    this._majorsSubject.next(data);
  }

  getTotalMajor(): number {
    return this._totalMajorSubject.getValue();
  }

  setTotalMajor(data: number) {
    this._totalMajorSubject.next(data);
  }

  getMajor(): MajorModel {
    return this._majorSubject.getValue();
  }

  setMajor(data: MajorModel) {
    this._majorSubject.next(data);
  }

  getIsLoading(): boolean {
    return this._isLoadingSubject.getValue();
  }

  setIsLoading(isLoading: boolean) {
    this._isLoadingSubject.next(isLoading);
  }

  constructor(
    private majorService: MajorService,
    private viewState: ViewState,
  ) {

  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  public search(dataSearch: any) {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    const sub = this.majorService.search(dataSearch).subscribe({
      next: (res: BaseTableResponse<MajorModel>) => {
        this.setIsLoading(false);
        cv.paginator.total = res.total;
        this.setMajors(res.items);
        this.setTotalMajor(res.total);
      },
      error: (err) => {
        this.setIsLoading(false);
        console.log(`Error get majors`, err)
      }
    })

    this.unsubscribe.push(sub);
  }

  public findById(id: string | null) {
    this.setIsLoading(true);

    if (id) {
      const sub = this.majorService.findById(id).subscribe({
        next: (res: BaseResponse<MajorModel>) => {
          this.setMajor(res.data);
        },
        error: (err) => {
          this.setIsLoading(false);
          console.log(`Error get major`, err)
        }
      })

      this.unsubscribe.push(sub);
    } else {
      this.setMajor(new MajorModel());
    }
    this.setIsLoading(false);
  }

  public save(obj: MajorModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.majorService.save(obj).subscribe({
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

  public update(id: string, obj: MajorModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.majorService.update(id, obj).subscribe({
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
      this.majorService.delete(id).subscribe({
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

  public exportTemplate(): Promise<any> {
    this.setIsLoading(true);
    return new Promise((resolve) => {
      this.majorService.exportTemplate().subscribe({
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

  public import(formData: FormData): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.majorService.import(formData).subscribe({
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
