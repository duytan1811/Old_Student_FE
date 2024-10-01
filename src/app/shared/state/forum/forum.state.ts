import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { ViewState } from '../base/view.state';
import { ForumModel } from '../../models/forum/forum.model';
import { ForumService } from '../../services/forum/forum.service';

@Injectable({
  providedIn: 'root',
})
export class ForumState implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  private _newsSubject: BehaviorSubject<Array<ForumModel>> = new BehaviorSubject(Array());
  public news$: Observable<Array<ForumModel>> = this._newsSubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(Boolean());
  public isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();

  getFourms(): Array<ForumModel> {
    return this._newsSubject.getValue();
  }

  setFourms(data: Array<ForumModel>) {
    this._newsSubject.next(data);
  }


  getIsLoading(): boolean {
    return this._isLoadingSubject.getValue();
  }

  setIsLoading(isLoading: boolean) {
    this._isLoadingSubject.next(isLoading);
  }

  constructor(
    private forumService: ForumService,
    private viewState: ViewState,
  ) {
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  public search(dataSearch: any) {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    const sub = this.forumService.search(dataSearch).subscribe({
      next: (res: BaseTableResponse<ForumModel>) => {
        this.setIsLoading(false);
        cv.paginator.total = res.total;
        this.setFourms(res.items);
      },
      error: (err) => {
        this.setIsLoading(false);
        console.log(`Error get fourm`, err)
      }
    })

    this.unsubscribe.push(sub);
  }
}
