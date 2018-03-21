import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DataUploaderComponent } from './GMDataLoader/dataUploader.component';
import { GMCalculatorComponent } from './gm-calculator/gm-calculator.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Uploadservice } from './app-service/upload-data.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DataUploaderComponent,
    GMCalculatorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    Ng2SmartTableModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'dataUploader', component: DataUploaderComponent },
      { path: 'gm-calculator', component: GMCalculatorComponent}
    ])
  ],
  providers: [
    Uploadservice
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
