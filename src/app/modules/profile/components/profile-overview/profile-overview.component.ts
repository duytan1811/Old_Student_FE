import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentModel } from 'src/app/shared/models/students/student.model';
import { UserModel } from 'src/app/shared/models/users/user.model';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: []
})
export class ProfileOverviewComponent implements OnInit {

  public user$: Observable<UserModel>;
  public student$: Observable<StudentModel>;
  constructor(private authState: state.AuthState,
    private studentState: state.StudentState
  ) { }

  ngOnInit(): void {
    this.user$ = this.authState.currentUser$;
    this.student$ = this.studentState.student$;
    this.user$.subscribe((res: any) => {
      if (res) {
        this.studentState.findById(res.studentId);
      }
    })
  }

}
