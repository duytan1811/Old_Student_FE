import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { BaseTableResponse } from 'src/app/shared/models/base/base-table-response.model';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { ViewState } from '../base/view.state';
import { StudentModel } from 'src/app/shared/models/students/student.model';
import { StudentService } from '../../services/student/student.service';

@Injectable({
  providedIn: 'root',
})
export class StudentState implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  private _studentsSubject: BehaviorSubject<Array<StudentModel>> = new BehaviorSubject(Array());
  public students$: Observable<Array<StudentModel>> = this._studentsSubject.asObservable();

  private _totalStudentSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalStudent$: Observable<number> = this._totalStudentSubject.asObservable();

  private _studentStudentsSubject: BehaviorSubject<Array<StudentModel>> = new BehaviorSubject(Array());
  public studentStudents$: Observable<Array<StudentModel>> = this._studentStudentsSubject.asObservable();

  private _totalStudentStudentSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public totalStudentStudent$: Observable<number> = this._totalStudentStudentSubject.asObservable();

  private _studentSubject: BehaviorSubject<StudentModel> = new BehaviorSubject(Object());
  public student$: Observable<StudentModel> = this._studentSubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(Boolean());
  public isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();

  getStudents(): Array<StudentModel> {
    return this._studentsSubject.getValue();
  }

  setStudents(data: Array<StudentModel>) {
    this._studentsSubject.next(data);
  }

  getTotalStudent(): number {
    return this._totalStudentSubject.getValue();
  }

  setTotalStudent(data: number) {
    this._totalStudentSubject.next(data);
  }

  getStudent(): StudentModel {
    return this._studentSubject.getValue();
  }

  setStudent(data: StudentModel) {
    this._studentSubject.next(data);
  }

  getIsLoading(): boolean {
    return this._isLoadingSubject.getValue();
  }

  setIsLoading(isLoading: boolean) {
    this._isLoadingSubject.next(isLoading);
  }

  constructor(
    private studentService: StudentService,
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
    const sub = this.studentService.search(dataSearch).subscribe({
      next: (res: BaseTableResponse<StudentModel>) => {
        this.setIsLoading(false);
        cv.paginator.total = res.total;
        this.setStudents(res.items);
        this.setTotalStudent(res.total);
      },
      error: (err) => {
        this.setIsLoading(false);
        console.log(`Error get students`, err)
      }
    })

    this.unsubscribe.push(sub);
  }

  public findById(id: string | undefined) {
    this.setIsLoading(true);

    if (id) {
      const sub = this.studentService.findById(id).subscribe({
        next: (res: BaseResponse<StudentModel>) => {
          this.setStudent(res.data);
        },
        error: (err) => {
          this.setIsLoading(false);
          console.log(`Error get student`, err)
        }
      })

      this.unsubscribe.push(sub);
    } else {
      this.setStudent(new StudentModel());
    }
    this.setIsLoading(false);
  }

  public save(obj: StudentModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.studentService.save(obj).subscribe({
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

  public update(id: string, obj: StudentModel): Promise<any> {
    this.setIsLoading(true);
    const cv = this.viewState.getViewState();
    return new Promise((resolve) => {
      this.studentService.update(id, obj).subscribe({
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
      this.studentService.delete(id).subscribe({
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
