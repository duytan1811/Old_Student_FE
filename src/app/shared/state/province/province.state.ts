import { Injectable  } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProvinceModel } from 'src/app/shared/models/province/province.model';
import { UtilsService } from 'src/app/shared/services';
const URL_PROVINCE_FILE = 'assets/data/province.json';

@Injectable({
  providedIn: 'root',
})
export class ProvinceState {

  private _provincesSubject: BehaviorSubject<Array<ProvinceModel>> = new BehaviorSubject(Array());
  public provinces$: Observable<Array<ProvinceModel>> = this._provincesSubject.asObservable();

  private _provinceSubject: BehaviorSubject<ProvinceModel> = new BehaviorSubject(Object());
  public province$: Observable<ProvinceModel> = this._provinceSubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(Boolean());
  public isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();

  getProvinces(): Array<ProvinceModel> {
    return this._provincesSubject.getValue();
  }

  setProvinces(data: Array<ProvinceModel>) {
    this._provincesSubject.next(data);
  }

  constructor(
    private utilsService: UtilsService
  ) {
    this.initialProvinces();
  }

  private initialProvinces() {
    this.utilsService.loadFileUrl(URL_PROVINCE_FILE).then((value) => {
      this.setProvinces(Object.values(value));
    });
  }

}
