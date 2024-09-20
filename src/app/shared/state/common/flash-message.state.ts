import { Injectable, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonConstants } from 'src/app/shared/constants/common-constants';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FlashMessageState implements OnDestroy {
  private sub: Subscription;
  constructor(
    private toastrService: ToastrService,
    private translateService: TranslateService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private success(message: string) {
    this.toastrService.success(message);
  }

  private error(message: string) {
    this.toastrService.error(message);
  }

  public message(type: string, message: string) {
    if (type) {
      if (type.toLowerCase() === CommonConstants.RESPONSE_TYPES.SUCCESS) {
        this.success(message);
      } else if (type.toLowerCase() === CommonConstants.RESPONSE_TYPES.ERROR) {
        this.error(message);
      }
    }
  }
}
