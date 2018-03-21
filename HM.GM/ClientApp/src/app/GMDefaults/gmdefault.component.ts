import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ServerDataSource } from 'ng2-smart-table';
import { Http } from '@angular/http';
import { GmdefaultsService } from '../Service/gmdefaults.service';
import { GMDefaults } from "../Model/GMDefaults";
@Component({
  selector: 'app-gmdefault',
  templateUrl: './gmdefault.component.html',
})
export class GMdefaultComponent implements OnInit {
  title = 'app';
  
  settings = {
    actions: false,
    columns: {
      BillingComponent: {
        title: 'Average Billing',
      },
      Rate: {
        title: 'Rate',
      }
    }
  }
  gmdefaults: GMDefaults[] = [];

  constructor(protected service: GmdefaultsService) {
      
    this.service.getBillRate()
   }

  ngOnInit() {
    this.service
      .getBillRate()
      .subscribe(
        (defaults) => {
          this.gmdefaults = defaults;
        }
      );
   }

}
