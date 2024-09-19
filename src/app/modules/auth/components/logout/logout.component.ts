import { Component, OnInit } from '@angular/core';
import * as state from 'src/app/shared/state'
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private authState: state.AuthState) {
    this.authState.logout();
  }

  ngOnInit(): void {}
}
