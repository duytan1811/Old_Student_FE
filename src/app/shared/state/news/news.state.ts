import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { ViewState } from '../base/view.state';
import { NewsModel } from 'src/app/shared/models/news/news.model';
import { NewsService } from '../../services/news/news.service';

@Injectable({
  providedIn: 'root',
})
export class NewsState implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  private _newsListSubject: BehaviorSubject<Array<NewsModel>> = new BehaviorSubject(Array());
  public newsList$: Observable<Array<NewsModel>> = this._newsListSubject.asObservable();

  private _totalNewsSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalNews$: Observable<number> = this._totalNewsSubject.asObservable();

  private _newsNewssSubject: BehaviorSubject<Array<NewsModel>> = new BehaviorSubject(Array());
  public newsNewss$: Observable<Array<NewsModel>> = this._newsNewssSubject.asObservable();

  private _totalNewsNewsSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalNewsNews$: Observable<number> = this._totalNewsNewsSubject.asObservable();

  private _newsSubject: BehaviorSubject<NewsModel> = new BehaviorSubject(Object());
  public news$: Observable<NewsModel> = this._newsSubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(Boolean());
  public isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();

  getNewsList(): Array<NewsModel> {
    return this._newsListSubject.getValue();
  }

  setNewsList(data: Array<NewsModel>) {
    this._newsListSubject.next(data);
  }

  getTotalNews(): number {
    return this._totalNewsSubject.getValue();
  }

  setTotalNews(data: number) {
    this._totalNewsSubject.next(data);
  }

  getNews(): NewsModel {
    return this._newsSubject.getValue();
  }

  setNews(data: NewsModel) {
    this._newsSubject.next(data);
  }

  getIsLoading(): boolean {
    return this._isLoadingSubject.getValue();
  }

  setIsLoading(isLoading: boolean) {
    this._isLoadingSubject.next(isLoading);
  }

  constructor(
    private newsService: NewsService,
    private viewState: ViewState,
  ) {
    this.search(new BaseViewModel());
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  public search(dataSearch: any) {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    const sub = this.newsService.search(dataSearch).subscribe({
      next: (res: BaseTableResponse<NewsModel>) => {
        this.setIsLoading(false);
        cv.paginator.total = res.total;
        this.setNewsList(res.items);
        this.setTotalNews(res.total);
      },
      error: (err) => {
        this.setIsLoading(false);
        console.log(`Error get newss`, err)
      }
    })

    this.unsubscribe.push(sub);
  }

  public findById(id: string | null) {
    this.setIsLoading(true);

    if (id !== null) {
      const sub = this.newsService.findById(id).subscribe({
        next: (res: BaseResponse<NewsModel>) => {
          this.setNews(res.data);
        },
        error: (err) => {
          this.setIsLoading(false);
          console.log(`Error get news`, err)
        }
      })

      this.unsubscribe.push(sub);
    } else {
      this.setNews(new NewsModel());
    }
    this.setIsLoading(false);
  }

  public save(obj: NewsModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.newsService.save(obj).subscribe({
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

  public update(id: string, obj: NewsModel): Promise<any> {
    this.setIsLoading(true);
    return new Promise((resolve) => {
      this.newsService.update(id, obj).subscribe({
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

  public like(id: string): Promise<any> {
    this.setIsLoading(true);
    return new Promise((resolve) => {
      this.newsService.like(id).subscribe({
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

  public delete(id: string): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.newsService.delete(id).subscribe({
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
