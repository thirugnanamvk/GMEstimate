import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { DataUploaderComponent } from './GMDataLoader/dataUploader.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Uploadservice } from './app-service/upload-data.service';
import { GmdefaultsService } from './app-service/gmdefaults.service';
import { GMdefaultComponent } from './GMDefaults/gmdefault.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    DataUploaderComponent,
    FetchDataComponent,
    GMdefaultComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    Ng2SmartTableModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'dataUploader', component: DataUploaderComponent },
      
    ])
  ],
  providers: [
    Uploadservice,
    GmdefaultsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
