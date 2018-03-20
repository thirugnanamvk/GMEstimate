import { Component } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { BehaviorSubject } from 'rxjs';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@Component({
    selector: 'dataUploader',
    templateUrl: './dataUploader.component.html'
})
export class DataUploaderComponent {
    arrayBuffer: any;
   public  gridData: any [][];
    file: File;

    settings = {

        actions: false,
        columns: {
            actions: 'false',
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
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets['Cost Sheet Data - Master'];
            //for (var i = 0; i != worksheet.; ++i) {
            //    for (var j = 0; j != worksheet.length; ++j) {
            //        this.gridData[i][j] = worksheet[i][j];
            //    }
            //}
           // var json = XLSX.utils.sheet_to_json(worksheet, { raw: true });
            this.gridData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
           
            console.log(this.gridData);
        }
     fileReader.readAsArrayBuffer(this.file);

     
    }

    
}