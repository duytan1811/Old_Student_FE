import {  Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { ViewState } from '../base/view.state';
import { BaseTableResponse } from '../../models/base/base-table-response.model';
import { QuestionModel } from '../../models/questions/question.model';
import { QuestionService } from '../../services/questions/question.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionState implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  private _questionsSubject: BehaviorSubject<Array<QuestionModel>> = new BehaviorSubject(Array());
  public questions$: Observable<Array<QuestionModel>> = this._questionsSubject.asObservable();

  private _totalQuestionSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalQuestion$: Observable<number> = this._totalQuestionSubject.asObservable();

  private _questionSubject: BehaviorSubject<QuestionModel> = new BehaviorSubject(Object());
  public question$: Observable<QuestionModel> = this._questionSubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(Boolean());
  public isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();

  getQuestions(): Array<QuestionModel> {
    return this._questionsSubject.getValue();
  }

  setQuestions(data: Array<QuestionModel>) {
    this._questionsSubject.next(data);
  }

  getTotalQuestion(): number {
    return this._totalQuestionSubject.getValue();
  }

  setTotalQuestion(data: number) {
    this._totalQuestionSubject.next(data);
  }

  getQuestion(): QuestionModel {
    return this._questionSubject.getValue();
  }

  setQuestion(data: QuestionModel) {
    this._questionSubject.next(data);
  }

  getIsLoading(): boolean {
    return this._isLoadingSubject.getValue();
  }

  setIsLoading(isLoading: boolean) {
    this._isLoadingSubject.next(isLoading);
  }

  constructor(
    private questionService: QuestionService,
    private viewState: ViewState,
  ) {

  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  public search(dataSearch: any) {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    const sub = this.questionService.search(dataSearch).subscribe({
      next: (res: BaseTableResponse<QuestionModel>) => {
        this.setIsLoading(false);
        cv.paginator.total = res.total;
        this.setQuestions(res.items);
        this.setTotalQuestion(res.total);
      },
      error: (err) => {
        this.setIsLoading(false);
        console.log(`Error get questions`, err)
      }
    })

    this.unsubscribe.push(sub);
  }

  public findById(id: string | null) {
    this.setIsLoading(true);

    if (id) {
      const sub = this.questionService.findById(id).subscribe({
        next: (res: BaseResponse<QuestionModel>) => {
          this.setQuestion(res.data);
        },
        error: (err) => {
          this.setIsLoading(false);
          console.log(`Error get question`, err)
        }
      })

      this.unsubscribe.push(sub);
    } else {
      this.setQuestion(new QuestionModel());
    }
    this.setIsLoading(false);
  }

  public save(obj: QuestionModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.questionService.save(obj).subscribe({
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

  public update(id: string, obj: QuestionModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.questionService.update(id, obj).subscribe({
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
      this.questionService.delete(id).subscribe({
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
