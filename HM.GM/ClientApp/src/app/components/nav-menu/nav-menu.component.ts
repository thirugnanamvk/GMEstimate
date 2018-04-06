import { Component } from '@angular/core';
import * as services from '../../services';
import * as models from '../../model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  public isExpanded = false;
  public isUploadEnable = false;
  public currentuser: models.UserAccess;
  public authRslt: string = '';
  public authBack: string = 'grey';
  public postRslt: string = '';
  public user: models.UserAccess;
  public postBack: string = 'grey';

  constructor(private authSvc: services.AuthenticationService, protected service: services.GmCalculatorService) {
    this.testAuthentication();
    this.isUploadEnable = true;

  }

  public collapse() {
    this.isExpanded = false;
  }
  public toggle() {
    this.isExpanded = !this.isExpanded;
  }

  private testAuthentication(): void {
    this.user = new models.UserAccess();
    this.authSvc.getUser()
      .subscribe(
      r => {
        this.authRslt = r;
        this.authBack = 'success';
        this.user.UserName = r;
        this.service
          .getUseraccess(this.user)
          .subscribe(
          (defaults) => {
            this.currentuser = defaults;
            this.isUploadEnable = this.currentuser.IsAdmin;
          }
          );
      },
      e => { this.authBack = 'error'; }
      );
  }
}
