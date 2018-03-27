import { Component } from '@angular/core';
import * as svcs from '../app-service';
import * as models from '../Model';
import { UserAccess } from '../Model';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  public isUploadEnable = false;
  public currentuser: models.UserAccess;
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  private authRslt: string = '';
  private authBack: string = 'grey';
  private postRslt: string = '';
  private user: UserAccess;
  private postBack: string = 'grey';
  constructor(private authSvc: svcs.AuthenticationService, protected service: svcs.GmdefaultsService) {
    this.testAuthentication();
  }
  ngOnInit() {
    
  }
  testAuthentication(): void {
    this.user = new UserAccess();
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
            console.log('Admin Status'+ this.currentuser.IsAdmin);
          }
          );
      },
      e => { console.log(e); this.authBack = 'error'; }
      );
  }
}
