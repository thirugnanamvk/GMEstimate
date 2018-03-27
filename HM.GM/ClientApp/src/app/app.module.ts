import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import * as services from './services';
import * as components from './components';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

@NgModule({
  declarations: [
    AppComponent,
    components.NavMenuComponent,
    components.DataUploaderComponent,
    components.AlertComponent,
    components.GmCalculatorContainerComponent,
    components.GmCalculatorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    NguiAutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forRoot([
      { path: 'gmcalculator', component: components.GmCalculatorContainerComponent, pathMatch: 'full' },
      { path: 'dataUploader', component: components.DataUploaderComponent },
      { path: '', component: components.GmCalculatorContainerComponent }
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: services.WinauthInterceptorService,
      multi: true
    },
    services.UploadDataService,
    services.GmCalculatorService,
    services.AlertService,
    services.AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
