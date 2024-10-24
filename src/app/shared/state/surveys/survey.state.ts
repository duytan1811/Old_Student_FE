import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { ViewState } from '../base/view.state';
import { BaseTableResponse } from '../../models/base/base-table-response.model';
import { SurveyModel } from '../../models/surveys/survey.mode';
import { SurveyService } from '../../services/surveys/survey.service';
import { SurveyResultModel } from '../../models/surveys/survey-result.model';
import { SurveyResultDetailModel } from '../../models/surveys/survey-result-detail.model';

@Injectable({
  providedIn: 'root',
})
export class SurveyState implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  private _surveysSubject: BehaviorSubject<Array<SurveyModel>> =
    new BehaviorSubject(Array());
  public surveys$: Observable<Array<SurveyModel>> =
    this._surveysSubject.asObservable();

  private _surveyResultsSubject: BehaviorSubject<Array<SurveyResultModel>> =
    new BehaviorSubject(Array());
  public surveyResults$: Observable<Array<SurveyResultModel>> =
    this._surveyResultsSubject.asObservable();

  private _totalSurveySubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalSurvey$: Observable<number> =
    this._totalSurveySubject.asObservable();

  private _totalSurveyResultSubject: BehaviorSubject<number> =
    new BehaviorSubject(0);
  public totalSurveyResult$: Observable<number> =
    this._totalSurveyResultSubject.asObservable();

  private _surveySubject: BehaviorSubject<SurveyModel> = new BehaviorSubject(
    Object()
  );
  public survey$: Observable<SurveyModel> = this._surveySubject.asObservable();

  private _surveyResultSubject: BehaviorSubject<SurveyResultDetailModel> =
    new BehaviorSubject(Object());
  public surveyResult$: Observable<SurveyResultDetailModel> =
    this._surveyResultSubject.asObservable();

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

  getSurveyResults(): Array<SurveyResultModel> {
    return this._surveyResultsSubject.getValue();
  }

  setSurveyResults(data: Array<SurveyResultModel>) {
    this._surveyResultsSubject.next(data);
  }

  getTotalSurvey(): number {
    return this._totalSurveySubject.getValue();
  }

  setTotalSurvey(data: number) {
    this._totalSurveySubject.next(data);
  }

  getTotalSurveyResult(): number {
    return this._totalSurveyResultSubject.getValue();
  }

  setTotalSurveyResult(data: number) {
    this._totalSurveyResultSubject.next(data);
  }

  getSurvey(): SurveyModel {
    return this._surveySubject.getValue();
  }

  setSurvey(data: SurveyModel) {
    this._surveySubject.next(data);
  }

  getSurveyResult(): SurveyResultDetailModel {
    return this._surveyResultSubject.getValue();
  }

  setSurveyResult(data: SurveyResultDetailModel) {
    this._surveyResultSubject.next(data);
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

  public searchSurveyResult(surveyId: string, dataSearch: any) {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    const sub = this.surveyService
      .searchSurveyResult(surveyId, dataSearch)
      .subscribe({
        next: (res: BaseTableResponse<SurveyResultModel>) => {
          this.setIsLoading(false);
          cv.paginator.total = res.total;
          this.setSurveyResults(res.items);
          this.setTotalSurveyResult(res.total);
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

  public getSurveyDetail(surveyId: string | null, userId: string | null) {
    this.setIsLoading(true);

    if (surveyId && userId) {
      const sub = this.surveyService
        .getSurveyDetail(surveyId, userId)
        .subscribe({
          next: (res: BaseResponse<SurveyResultDetailModel>) => {
            this.setSurveyResult(res.data);
          },
          error: (err) => {
            this.setIsLoading(false);
            console.log(`Error get survey result detail`, err);
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
