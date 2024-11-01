import { Injectable, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject, Subscription, map, tap } from 'rxjs';
import { saveAs } from 'file-saver';
import { TranslateService } from '@ngx-translate/core';
import { CommonConstants } from 'src/app/shared/constants/common-constants';

@Injectable({
  providedIn: 'root',
})
export class CommonState implements OnDestroy {

  private statuses = CommonConstants.STATUSES;
  private sub: Subscription;

  constructor(
    private translateService: TranslateService
  ) {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public convertFileToBase64(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => result.next(reader.result as string);
    return result;
  }

  public convertBase64ToFile(base64Data: string, fileName: string, fileType: string): void {
    const binaryData = atob(base64Data);

    const byteArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: fileType });

    saveAs(blob, fileName);
  }

  public getStatusString(statusKey?: number): string {
    const status = this.statuses.find(x => x.key == statusKey);
    let result = '';
    this.translateService.get(`Status.${status?.value}`)
      .subscribe(lan => {
        result = lan;
      });

    return result;
  }
}
