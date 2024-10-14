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

  private _dropdownUsersSubject: BehaviorSubject<Array<SelectListItem>> =
    new BehaviorSubject(Array());
  public dropdownUsers$: Observable<Array<SelectListItem>> =
    this._dropdownUsersSubject.asObservable();

  private _dropdownMajorsSubject: BehaviorSubject<Array<SelectListItem>> =
    new BehaviorSubject(Array());
  public dropdownMajors$: Observable<Array<SelectListItem>> =
    this._dropdownMajorsSubject.asObservable();

  private _dropdownRolesSubject: BehaviorSubject<Array<SelectListItem>> =
    new BehaviorSubject(Array());
  public dropdownRoles$: Observable<Array<SelectListItem>> =
    this._dropdownRolesSubject.asObservable();

  private _dropdownNewsTypesSubject: BehaviorSubject<Array<SelectListItem>> =
    new BehaviorSubject(Array());
  public dropdownNewsTypes$: Observable<Array<SelectListItem>> =
    this._dropdownNewsTypesSubject.asObservable();

    private _dropdownEventTypesSubject: BehaviorSubject<Array<SelectListItem>> =
    new BehaviorSubject(Array());
  public dropdownEventTypes$: Observable<Array<SelectListItem>> =
    this._dropdownEventTypesSubject.asObservable();

  getNewsTypes(): Array<SelectListItem> {
    return this._dropdownNewsTypesSubject.getValue();
  }

  setNewsTypes(data: Array<SelectListItem>) {
    this._dropdownNewsTypesSubject.next(data);
  }

  getEventTypes(): Array<SelectListItem> {
    return this._dropdownEventTypesSubject.getValue();
  }

  setEventTypes(data: Array<SelectListItem>) {
    this._dropdownEventTypesSubject.next(data);
  }

  getUsers(): Array<SelectListItem> {
    return this._dropdownUsersSubject.getValue();
  }

  setUsers(data: Array<SelectListItem>) {
    this._dropdownUsersSubject.next(data);
  }

  getMajors(): Array<SelectListItem> {
    return this._dropdownMajorsSubject.getValue();
  }

  setMajors(data: Array<SelectListItem>) {
    this._dropdownMajorsSubject.next(data);
  }

  getRoles(): Array<SelectListItem> {
    return this._dropdownRolesSubject.getValue();
  }

  setRoles(data: Array<SelectListItem>) {
    this._dropdownRolesSubject.next(data);
  }

  constructor(private dropdownService: DropdownService) {}

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  public getDropdownUsers() {
    const sub = this.dropdownService.getUsers().subscribe({
      next: (res: BaseResponse<Array<SelectListItem>>) => {
        this.setUsers(res.data);
      },
      error: (err) => {
        console.log(`Error get dropdown users`, err);
      },
    });

    this.unsubscribe.push(sub);
  }

  public getDropdownMajors() {
    const sub = this.dropdownService.getMajors().subscribe({
      next: (res: BaseResponse<Array<SelectListItem>>) => {
        this.setMajors(res.data);
      },
      error: (err) => {
        console.log(`Error get dropdown major`, err);
      },
    });

    this.unsubscribe.push(sub);
  }

  public getDropdownRoles() {
    const sub = this.dropdownService.getRoles().subscribe({
      next: (res: BaseResponse<Array<SelectListItem>>) => {
        this.setRoles(res.data);
      },
      error: (err) => {
        console.log(`Error get dropdown major`, err);
      },
    });

    this.unsubscribe.push(sub);
  }

  public getDropdownNewTypes() {
    const sub = this.dropdownService.getNewsTypes().subscribe({
      next: (res: BaseResponse<Array<SelectListItem>>) => {
        this.setNewsTypes(res.data);
      },
      error: (err) => {
        console.log(`Error get dropdown news types`, err);
      },
    });

    this.unsubscribe.push(sub);
  }

  public getDropdownEventTypes() {
    const sub = this.dropdownService.getEventTypes().subscribe({
      next: (res: BaseResponse<Array<SelectListItem>>) => {
        this.setEventTypes(res.data);
      },
      error: (err) => {
        console.log(`Error get dropdown event types`, err);
      },
    });

    this.unsubscribe.push(sub);
  }
}
