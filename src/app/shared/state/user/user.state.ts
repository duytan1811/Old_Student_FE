import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { UserService } from 'src/app/shared/services';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { ViewState } from '../base/view.state';
import { UserModel } from 'src/app/shared/models/users/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserState implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  private _usersSubject: BehaviorSubject<Array<UserModel>> = new BehaviorSubject(Array());
  public users$: Observable<Array<UserModel>> = this._usersSubject.asObservable();

  private _totalUserSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalUser$: Observable<number> = this._totalUserSubject.asObservable();

  private _userUsersSubject: BehaviorSubject<Array<UserModel>> = new BehaviorSubject(Array());
  public userUsers$: Observable<Array<UserModel>> = this._userUsersSubject.asObservable();

  private _totalUserUserSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalUserUser$: Observable<number> = this._totalUserUserSubject.asObservable();

  private _userSubject: BehaviorSubject<UserModel> = new BehaviorSubject(Object());
  public user$: Observable<UserModel> = this._userSubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(Boolean());
  public isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();

  getUsers(): Array<UserModel> {
    return this._usersSubject.getValue();
  }

  setUsers(data: Array<UserModel>) {
    this._usersSubject.next(data);
  }

  getUserUsers(): Array<UserModel> {
    return this._userUsersSubject.getValue();
  }

  setUserUsers(data: Array<UserModel>) {
    this._userUsersSubject.next(data);
  }

  getTotalUser(): number {
    return this._totalUserSubject.getValue();
  }

  setTotalUser(data: number) {
    this._totalUserSubject.next(data);
  }

  getTotalUserUser(): number {
    return this._totalUserUserSubject.getValue();
  }

  setTotalUserUser(data: number) {
    this._totalUserUserSubject.next(data);
  }

  getUser(): UserModel {
    return this._userSubject.getValue();
  }

  setUser(data: UserModel) {
    this._userSubject.next(data);
  }

  getIsLoading(): boolean {
    return this._isLoadingSubject.getValue();
  }

  setIsLoading(isLoading: boolean) {
    this._isLoadingSubject.next(isLoading);
  }

  constructor(
    private userService: UserService,
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
    const sub = this.userService.search(dataSearch).subscribe({
      next: (res: BaseTableResponse<UserModel>) => {
        this.setIsLoading(false);
        cv.paginator.total = res.total;
        this.setUsers(res.items);
        this.setTotalUser(res.total);
      },
      error: (err) => {
        this.setIsLoading(false);
        console.log(`Error get users`, err)
      }
    })

    this.unsubscribe.push(sub);
  }

  public findById(id: string | undefined) {
    this.setIsLoading(true);

    if (id) {
      const sub = this.userService.findById(id).subscribe({
        next: (res: BaseResponse<UserModel>) => {
          this.setUser(res.data);
        },
        error: (err) => {
          this.setIsLoading(false);
          console.log(`Error get user`, err)
        }
      })

      this.unsubscribe.push(sub);
    } else {
      this.setUser(new UserModel());
    }
    this.setIsLoading(false);
  }

  public save(obj: UserModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.userService.save(obj).subscribe({
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

  public update(id: string, obj: UserModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.userService.update(id, obj).subscribe({
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
      this.userService.delete(id).subscribe({
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
