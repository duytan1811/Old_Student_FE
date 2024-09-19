import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import * as state from './shared/state';
import { ExtrasModule } from './_metronic/partials';
import { ConfirmDeleteModalComponent } from './shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

function appInitializer(authState: state.AuthState) {
  return () => {
    return new Promise((resolve) => {
      resolve(authState.getUserByToken().subscribe());
    });
  };
}

@NgModule({
  declarations: [AppComponent, ConfirmDeleteModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ExtrasModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    AppRoutingModule,
    MatDialogModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [state.AuthState],
    },
    state.AuthState,
    state.MenuState,
    state.ViewState
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
