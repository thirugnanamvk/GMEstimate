import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DataUploaderComponent } from './GMDataLoader/dataUploader.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Uploadservice, GmdefaultsService } from './app-service';
import { GMdefaultComponent } from './GMDefaults/gmdefault.component'

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DataUploaderComponent,
    GMdefaultComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    Ng2SmartTableModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'dataUploader', component: DataUploaderComponent },
      { path: 'gmdefault', component: GMdefaultComponent }
    ])
  ],
  providers: [
    Uploadservice,
    GmdefaultsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
