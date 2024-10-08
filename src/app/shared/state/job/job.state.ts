import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { ViewState } from '../base/view.state';
import { BaseTableResponse } from '../../models/base/base-table-response.model';
import { JobModel } from '../../models/jobs/job.model';
import { JobService } from '../../services/job/job.service';

@Injectable({
  providedIn: 'root',
})
export class JobState implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  private _jobsSubject: BehaviorSubject<Array<JobModel>> = new BehaviorSubject(
    Array()
  );
  public jobs$: Observable<Array<JobModel>> = this._jobsSubject.asObservable();

  private _totalJobSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalJob$: Observable<number> = this._totalJobSubject.asObservable();

  private _jobSubject: BehaviorSubject<JobModel> = new BehaviorSubject(
    Object()
  );
  public job$: Observable<JobModel> = this._jobSubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(
    Boolean()
  );
  public isLoading$: Observable<boolean> =
    this._isLoadingSubject.asObservable();

  getJobs(): Array<JobModel> {
    return this._jobsSubject.getValue();
  }

  setJobs(data: Array<JobModel>) {
    this._jobsSubject.next(data);
  }

  getTotalJob(): number {
    return this._totalJobSubject.getValue();
  }

  setTotalJob(data: number) {
    this._totalJobSubject.next(data);
  }

  getJob(): JobModel {
    return this._jobSubject.getValue();
  }

  setJob(data: JobModel) {
    this._jobSubject.next(data);
  }

  getIsLoading(): boolean {
    return this._isLoadingSubject.getValue();
  }

  setIsLoading(isLoading: boolean) {
    this._isLoadingSubject.next(isLoading);
  }

  constructor(private jobService: JobService, private viewState: ViewState) {}

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  public search(dataSearch: any) {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    const sub = this.jobService.search(dataSearch).subscribe({
      next: (res: BaseTableResponse<JobModel>) => {
        this.setIsLoading(false);
        cv.paginator.total = res.total;
        this.setJobs(res.items);
        this.setTotalJob(res.total);
      },
      error: (err) => {
        this.setIsLoading(false);
        console.log(`Error get jobs`, err);
      },
    });

    this.unsubscribe.push(sub);
  }

  public findById(id: string | null) {
    this.setIsLoading(true);

    if (id) {
      const sub = this.jobService.findById(id).subscribe({
        next: (res: BaseResponse<JobModel>) => {
          this.setJob(res.data);
        },
        error: (err) => {
          this.setIsLoading(false);
          console.log(`Error get job`, err);
        },
      });

      this.unsubscribe.push(sub);
    } else {
      this.setJob(new JobModel());
    }
    this.setIsLoading(false);
  }

  public save(obj: JobModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.jobService.save(obj).subscribe({
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

  public update(id: string, obj: JobModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.jobService.update(id, obj).subscribe({
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
      this.jobService.delete(id).subscribe({
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

  public applyJob(data: any): Promise<any> {
    return new Promise((resolve) => {
      this.jobService.appllyJob(data).subscribe({
        next: (result) => {
          this.setIsLoading(false);
          resolve(result);
        },
        error: (e) => {
          this.setIsLoading(false);
          resolve(e.error?.message || e);
        },
      });
    });
  }
}
