import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { ViewState } from '../base/view.state';
import { BaseTableResponse } from '../../models/base/base-table-response.model';
import { SurveyModel } from '../../models/surveys/survey.mode';
import { SurveyService } from '../../services/surveys/survey.service';

@Injectable({
  providedIn: 'root',
})
export class SurveyState implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  private _surveysSubject: BehaviorSubject<Array<SurveyModel>> =
    new BehaviorSubject(Array());
  public surveys$: Observable<Array<SurveyModel>> =
    this._surveysSubject.asObservable();

  private _totalSurveySubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalSurvey$: Observable<number> =
    this._totalSurveySubject.asObservable();

  private _surveySubject: BehaviorSubject<SurveyModel> = new BehaviorSubject(
    Object()
  );
  public survey$: Observable<SurveyModel> = this._surveySubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(
    Boolean()
  );
  public isLoading$: Observable<boolean> =
    this._isLoadingSubject.asObservable();

  getSurveys(): Array<SurveyModel> {
    return this._surveysSubject.getValue();
  }

  setSurveys(data: Array<SurveyModel>) {
    this._surveysSubject.next(data);
  }

  getTotalSurvey(): number {
    return this._totalSurveySubject.getValue();
  }

  setTotalSurvey(data: number) {
    this._totalSurveySubject.next(data);
  }

  getSurvey(): SurveyModel {
    return this._surveySubject.getValue();
  }

  setSurvey(data: SurveyModel) {
    this._surveySubject.next(data);
  }

  getIsLoading(): boolean {
    return this._isLoadingSubject.getValue();
  }

  setIsLoading(isLoading: boolean) {
    this._isLoadingSubject.next(isLoading);
  }

  constructor(
    private surveyService: SurveyService,
    private viewState: ViewState
  ) {}

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  public search(dataSearch: any) {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    const sub = this.surveyService.search(dataSearch).subscribe({
      next: (res: BaseTableResponse<SurveyModel>) => {
        this.setIsLoading(false);
        cv.paginator.total = res.total;
        this.setSurveys(res.items);
        this.setTotalSurvey(res.total);
      },
      error: (err) => {
        this.setIsLoading(false);
        console.log(`Error get surveys`, err);
      },
    });

    this.unsubscribe.push(sub);
  }

  public findById(id: string | null) {
    this.setIsLoading(true);

    if (id) {
      const sub = this.surveyService.findById(id).subscribe({
        next: (res: BaseResponse<SurveyModel>) => {
          this.setSurvey(res.data);
        },
        error: (err) => {
          this.setIsLoading(false);
          console.log(`Error get survey`, err);
        },
      });

      this.unsubscribe.push(sub);
    } else {
      this.setSurvey(new SurveyModel());
    }
    this.setIsLoading(false);
  }

  public save(obj: SurveyModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.surveyService.save(obj).subscribe({
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

  public update(id: string, obj: SurveyModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.surveyService.update(id, obj).subscribe({
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
    });
  }

  public delete(id: string): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.surveyService.delete(id).subscribe({
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

  public saveSurveyResult(id: string, data: any): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.surveyService.saveSurveyResult(id, data).subscribe({
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
}
