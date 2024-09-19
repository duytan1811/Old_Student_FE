import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from 'src/app/shared/models/users/user.model';
import { TranslationService } from 'src/app/modules/i18n';
import * as state from 'src/app/shared/state';
@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  user$: Observable<UserModel>;
  private unsubscribe: Subscription[] = [];

  constructor(
    private authState: state.AuthState,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.user$ = this.authState.currentUser$;
  }

  logout() {
    this.authState.logout();
    document.location.reload();
  }
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

