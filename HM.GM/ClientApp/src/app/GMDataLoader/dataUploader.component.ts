import { Component } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { BehaviorSubject } from 'rxjs';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ResourceCostDetailVM } from '../Model/ResourceCostDetailVM';
import { ResourceCostDetail } from '../Model/ResourceCostDetail';
import { HttpClient } from '@angular/common/http';
import { Uploadservice } from '../app-service/upload-data.service'

@Component({
  selector: 'dataUploader',
  templateUrl: './dataUploader.component.html'
})
export class DataUploaderComponent {
  arrayBuffer: any;
  public isdisabled: boolean = false;
  gridData: ResourceCostDetailVM[];
  file: File;

  settings = {

    actions: false,
    columns: {

      Practice: {
        title: 'Practice'
      },
      Skillset: {
        title: 'Skillset'
      },
      Competency: {
        title: 'Competency'
      },
      OnsitePerHour: {
        title: 'USDHrOnsite'
      },
      OffshorePerHour: {
        title: 'USDHrOffshore'
      }
    }
  };

  source: LocalDataSource;

  constructor(private http: HttpClient, private _uploadservice: Uploadservice) {
    this.source = new LocalDataSource(this.gridData);
    
  }

  incomingfile(event: any) {
    this.file = event.target.files[0];
  }

  Upload() {
    this.isdisabled = true;
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
      var workbook = XLSX.read(bstr, { type: "binary" });
      var worksheet = workbook.Sheets['Cost Sheet Data - Master'];

      this.gridData = XLSX.utils.sheet_to_json(worksheet);
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  Save() {
    var objList = new Array<ResourceCostDetail>();
    for (var i = 0; i < this.gridData.length; i++) {
      objList.push(new ResourceCostDetail(this.gridData[i]));
    }
    this._uploadservice.UploadData(objList);
    
    this.isdisabled = false;
  }
}
