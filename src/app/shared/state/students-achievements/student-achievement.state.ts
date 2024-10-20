import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { ViewState } from '../base/view.state';
import { StudentAchievementModel } from '../../models/student-achivements/student-achievement.model';
import { StudentAchievementService } from '../../services/student-achievements/student-achievement.service';

@Injectable({
  providedIn: 'root',
})

export class StudentAchievementState implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  private _studentAchievementsSubject: BehaviorSubject<Array<StudentAchievementModel>> = new BehaviorSubject(Array());
  public studentAchievements$: Observable<Array<StudentAchievementModel>> = this._studentAchievementsSubject.asObservable();

  private _totalStudentAchievementSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalStudentAchievement$: Observable<number> = this._totalStudentAchievementSubject.asObservable();

  private _studentAchievementStudentAchievementsSubject: BehaviorSubject<Array<StudentAchievementModel>> = new BehaviorSubject(Array());
  public studentAchievementStudentAchievements$: Observable<Array<StudentAchievementModel>> = this._studentAchievementStudentAchievementsSubject.asObservable();

  private _totalStudentAchievementStudentAchievementSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalStudentAchievementStudentAchievement$: Observable<number> = this._totalStudentAchievementStudentAchievementSubject.asObservable();

  private _studentAchievementSubject: BehaviorSubject<StudentAchievementModel> = new BehaviorSubject(Object());
  public studentAchievement$: Observable<StudentAchievementModel> = this._studentAchievementSubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(Boolean());
  public isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();

  getStudentAchievements(): Array<StudentAchievementModel> {
    return this._studentAchievementsSubject.getValue();
  }

  setStudentAchievements(data: Array<StudentAchievementModel>) {
    this._studentAchievementsSubject.next(data);
  }

  getTotalStudentAchievement(): number {
    return this._totalStudentAchievementSubject.getValue();
  }

  setTotalStudentAchievement(data: number) {
    this._totalStudentAchievementSubject.next(data);
  }

  getStudentAchievement(): StudentAchievementModel {
    return this._studentAchievementSubject.getValue();
  }

  setStudentAchievement(data: StudentAchievementModel) {
    this._studentAchievementSubject.next(data);
  }

  getIsLoading(): boolean {
    return this._isLoadingSubject.getValue();
  }

  setIsLoading(isLoading: boolean) {
    this._isLoadingSubject.next(isLoading);
  }

  constructor(
    private studentAchievementService: StudentAchievementService,
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
    const sub = this.studentAchievementService.search(dataSearch).subscribe({
      next: (res: BaseTableResponse<StudentAchievementModel>) => {
        this.setIsLoading(false);
        cv.paginator.total = res.total;
        this.setStudentAchievements(res.items);
        this.setTotalStudentAchievement(res.total);
      },
      error: (err) => {
        this.setIsLoading(false);
        console.log(`Error get studentAchievements`, err)
      }
    })

    this.unsubscribe.push(sub);
  }

  public findById(id: string | undefined | null) {
    this.setIsLoading(true);

    if (id) {
      const sub = this.studentAchievementService.findById(id).subscribe({
        next: (res: BaseResponse<StudentAchievementModel>) => {
          this.setStudentAchievement(res.data);
        },
        error: (err) => {
          this.setIsLoading(false);
          console.log(`Error get studentAchievement`, err)
        }
      })

      this.unsubscribe.push(sub);
    } else {
      this.setStudentAchievement(new StudentAchievementModel());
    }
    this.setIsLoading(false);
  }

  public save(obj: StudentAchievementModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.studentAchievementService.save(obj).subscribe({
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

  public update(id: string, obj: StudentAchievementModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.studentAchievementService.update(id, obj).subscribe({
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
      this.studentAchievementService.delete(id).subscribe({
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
