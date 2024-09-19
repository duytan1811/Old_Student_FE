import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { VillageModel } from 'src/app/shared/models/villages/village.model';
import { UtilsService } from 'src/app/shared/services';
const URL_VILLAGE_FILE = 'assets/data/village.json';

@Injectable({
  providedIn: 'root',
})
export class VillageState {

  private _villagesSubject: BehaviorSubject<Array<VillageModel>> = new BehaviorSubject(Array());
  public villages$: Observable<Array<VillageModel>> = this._villagesSubject.asObservable();

  private _villageSubject: BehaviorSubject<VillageModel> = new BehaviorSubject(Object());
  public village$: Observable<VillageModel> = this._villageSubject.asObservable();

  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(Boolean());
  public isLoading$: Observable<boolean> = this._isLoadingSubject.asObservable();

  getVillages(): Array<VillageModel> {
    return this._villagesSubject.getValue();
  }

  setVillages(data: Array<VillageModel>) {
    this._villagesSubject.next(data);
  }

  constructor(
    private utilsService: UtilsService
  ) {
  }

  public getVillagesByDistrictCode(provinceCode: string) {
    this.utilsService.loadFileUrl(URL_VILLAGE_FILE).then((value) => {
      if (value) {
        const districts = Object.values(value) as Array<VillageModel>;

        const data = districts.filter(dis => dis.parentCode === provinceCode);
        this.setVillages(data);
      }
    });
  }
}
