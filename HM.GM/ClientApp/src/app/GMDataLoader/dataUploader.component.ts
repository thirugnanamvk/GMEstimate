import { Component } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { BehaviorSubject } from 'rxjs';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ResourceCostDetail } from '../Model/ResourceCostDetail';


@Component({
    selector: 'dataUploader',
    templateUrl: './dataUploader.component.html'
})
export class DataUploaderComponent {
  arrayBuffer: any;
  gridData: Array<ResourceCostDetail>;
    file: File;

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

    

incomingfile(event: any) 
  {
  this.file= event.target.files[0]; 
  }

 Upload() {
      let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var dataval = data.toString();
            var arr = new Array();
            for (var i = 0; i != data.length; ++i) {
                arr[i] = String.fromCharCode(data[i]);
            }
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
          var worksheet = workbook.Sheets['Cost Sheet Data - Master'];

          this.gridData = XLSX.utils.sheet_to_json(worksheet);
           
         
        }
     fileReader.readAsArrayBuffer(this.file);

     
    }

    
}
