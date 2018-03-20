import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';



@Component({
  selector: 'gm-calculator',
  templateUrl: './gm-calculator.component.html'
})
export class GMCalculatorComponent {
  gridData: any;
  settings = {

    actions: false,
    columns: {

      id: {
        title: 'Pratice'
      },
      Pratice: {
        title: 'Specific Skillset'
      },
      Competency: {
        title: 'Competency'
      },
      Onsite: {
        title: 'USD/Hr(Onsite)'
      },
      Offshore: {
        title: 'USD/Hr(Offshore)'
      }
    }
  };

  source: LocalDataSource;
  
  constructor() {
    debugger;
    this.source = new LocalDataSource(this.gridData);
  }

}
