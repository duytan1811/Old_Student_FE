import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DistrictModel } from 'src/app/shared/models/districts/district.model';
import { UtilsService } from 'src/app/shared/services';
const URL_DISTRICT_FILE = 'assets/data/district.json';

@Injectable({
  providedIn: 'root',
})
export class DistrictState {

  private _districtsSubject: BehaviorSubject<Array<DistrictModel>> = new BehaviorSubject(Array());
  public districts$: Observable<Array<DistrictModel>> = this._districtsSubject.asObservable();

  private _districtSubject: BehaviorSubject<DistrictModel> = new BehaviorSubject(Object());
  public district$: Observable<DistrictModel> = this._districtSubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(Boolean());
  public isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();

  getDistricts(): Array<DistrictModel> {
    return this._districtsSubject.getValue();
  }

  setDistricts(data: Array<DistrictModel>) {
    this._districtsSubject.next(data);
  }

  constructor(
    private utilsService: UtilsService
  ) {

  }

  public getDistrictsByProvinceCode(provinceCode: string) {
    this.utilsService.loadFileUrl(URL_DISTRICT_FILE).then((value) => {
      if (value) {
        const districts = Object.values(value) as Array<DistrictModel>;

        const data = districts.filter(dis => dis.parentCode === provinceCode);
        this.setDistricts(data);
      }
    });
  }

  private initialDistricts() {
    this.utilsService.loadFileUrl(URL_DISTRICT_FILE).then((value) => {
      this.setDistricts(Object.values(value));
    });
  }
}
