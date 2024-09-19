import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { DropdownService } from 'src/app/shared/services';
import { SelectListItem } from 'src/app/shared/models/base/select-list-item.model';

@Injectable({
  providedIn: 'root',
})
export class DropdownState implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  private _dropdownUsersSubject: BehaviorSubject<Array<SelectListItem>> = new BehaviorSubject(Array());
  public dropdownUsers$: Observable<Array<SelectListItem>> = this._dropdownUsersSubject.asObservable();

  getUsers(): Array<SelectListItem> {
    return this._dropdownUsersSubject.getValue();
  }

  setUsers(data: Array<SelectListItem>) {
    this._dropdownUsersSubject.next(data);
  }

  constructor(
    private dropdownService: DropdownService,
  ) {
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  public getDropdownUsers() {
    const sub = this.dropdownService.getUsers().subscribe({
      next: (res: BaseResponse<Array<SelectListItem>>) => {
        this.setUsers(res.data);
      },
      error: (err) => {
        console.log(`Error get dropdown users`, err)
      }
    })

    this.unsubscribe.push(sub);
  }
}
