import {  Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { ViewState } from '../base/view.state';
import { BaseTableResponse } from '../../models/base/base-table-response.model';
import { SurveyTemplateModel } from '../../models/survey-templates/survey-template.mode';
import { SurveyTemplateService } from '../../services/survey-templates/survey-template.service';

@Injectable({
  providedIn: 'root',
})
export class SurveyTemplateState implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  private _surveyTemplatesSubject: BehaviorSubject<Array<SurveyTemplateModel>> = new BehaviorSubject(Array());
  public surveyTemplates$: Observable<Array<SurveyTemplateModel>> = this._surveyTemplatesSubject.asObservable();

  private _totalSurveyTemplateSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalSurveyTemplate$: Observable<number> = this._totalSurveyTemplateSubject.asObservable();

  private _surveyTemplateSubject: BehaviorSubject<SurveyTemplateModel> = new BehaviorSubject(Object());
  public surveyTemplate$: Observable<SurveyTemplateModel> = this._surveyTemplateSubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(Boolean());
  public isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();

  getSurveyTemplates(): Array<SurveyTemplateModel> {
    return this._surveyTemplatesSubject.getValue();
  }

  setSurveyTemplates(data: Array<SurveyTemplateModel>) {
    this._surveyTemplatesSubject.next(data);
  }

  getTotalSurveyTemplate(): number {
    return this._totalSurveyTemplateSubject.getValue();
  }

  setTotalSurveyTemplate(data: number) {
    this._totalSurveyTemplateSubject.next(data);
  }

  getSurveyTemplate(): SurveyTemplateModel {
    return this._surveyTemplateSubject.getValue();
  }

  setSurveyTemplate(data: SurveyTemplateModel) {
    this._surveyTemplateSubject.next(data);
  }

  getIsLoading(): boolean {
    return this._isLoadingSubject.getValue();
  }

  setIsLoading(isLoading: boolean) {
    this._isLoadingSubject.next(isLoading);
  }

  constructor(
    private surveyTemplateService: SurveyTemplateService,
    private viewState: ViewState,
  ) {

  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  public search(dataSearch: any) {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    const sub = this.surveyTemplateService.search(dataSearch).subscribe({
      next: (res: BaseTableResponse<SurveyTemplateModel>) => {
        this.setIsLoading(false);
        cv.paginator.total = res.total;
        this.setSurveyTemplates(res.items);
        this.setTotalSurveyTemplate(res.total);
      },
      error: (err) => {
        this.setIsLoading(false);
        console.log(`Error get surveyTemplates`, err)
      }
    })

    this.unsubscribe.push(sub);
  }

  public findById(id: string | null) {
    this.setIsLoading(true);

    if (id) {
      const sub = this.surveyTemplateService.findById(id).subscribe({
        next: (res: BaseResponse<SurveyTemplateModel>) => {
          this.setSurveyTemplate(res.data);
        },
        error: (err) => {
          this.setIsLoading(false);
          console.log(`Error get surveyTemplate`, err)
        }
      })

      this.unsubscribe.push(sub);
    } else {
      this.setSurveyTemplate(new SurveyTemplateModel());
    }
    this.setIsLoading(false);
  }

  public save(obj: SurveyTemplateModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.surveyTemplateService.save(obj).subscribe({
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

  public update(id: string, obj: SurveyTemplateModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.surveyTemplateService.update(id, obj).subscribe({
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
      this.surveyTemplateService.delete(id).subscribe({
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
