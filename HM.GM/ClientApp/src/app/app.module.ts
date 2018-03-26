import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DataUploaderComponent } from './GMDataLoader/dataUploader.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Uploadservice, GmdefaultsService, AlertService } from './app-service';
import { GMdefaultComponent ,AlertComponent } from './Component';
import { GmcalculatorComponent } from './gmcalculator/gmcalculator.component';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DataUploaderComponent,
    GMdefaultComponent,
    GmcalculatorComponent,
    AlertComponent
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
      { path: 'gmcalculator', component: GmcalculatorComponent, pathMatch: 'full' },
      { path: 'dataUploader', component: DataUploaderComponent },
      { path: '', component: GmcalculatorComponent }
    ])
  ],
  providers: [
    Uploadservice,
    GmdefaultsService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
