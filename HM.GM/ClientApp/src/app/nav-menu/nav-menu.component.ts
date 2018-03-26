import { Component } from '@angular/core';
import * as svcs from '../app-service';
import * as models from '../Model';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
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
  private postBack: string = 'grey';
  constructor(private authSvc: svcs.AuthenticationService, protected service: svcs.GmdefaultsService) {
    this.testAuthentication();
  }
  ngOnInit() {
    this.service
      .getUseraccess(this.authRslt)
      .subscribe(
      (defaults) => {
        this.currentuser = defaults;
      }
      );
  }
  testAuthentication(): void {
    this.authSvc.getUser()
      .subscribe(
      r => { this.authRslt = r; this.authBack = 'success'; },
      e => { console.log(e); this.authBack = 'error'; }
      );
  }
}
