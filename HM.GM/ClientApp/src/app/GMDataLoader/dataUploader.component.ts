import { Component, ViewContainerRef } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { BehaviorSubject } from 'rxjs';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ResourceCostDetailVM } from '../Model/ResourceCostDetailVM';
import { ResourceCostDetail } from '../Model/ResourceCostDetail';
import { HttpClient } from '@angular/common/http';
import { Uploadservice, AlertService } from '../app-service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { error } from 'protractor';

@Component({
  selector: 'dataUploader',
  templateUrl: './dataUploader.component.html'
})
export class DataUploaderComponent  {
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
        title: 'USDHrOnsite',
        valuePrepareFunction: function (c, r) {
          if (!c) return 0;
          else return c;
        }
      },
      OffshorePerHour: {
        title: 'USDHrOffshore',
        valuePrepareFunction: function (c, r) {
          if (!c) return 0;
          else return c;
        }
      }
    }
  };

  source: LocalDataSource;
 
  constructor(private http: HttpClient, private _uploadservice: Uploadservice, private alertService: AlertService,  vcr: ViewContainerRef, private _spinner: Ng4LoadingSpinnerService ) {
    
    this.source = new LocalDataSource(this.gridData);
    
  }
  public uploadfile: boolean = true;
  incomingfile(event: any) {
    this.file = event.target.files[0];
    this.clear();
    this.uploadfile = false;
  }


  success(message: string) {
    this.alertService.success(message);
  }

  error(message: string) {
    this.alertService.error(message);
  }

  info(message: string) {
    this.alertService.info(message);
  }

  warn(message: string) {
    this.alertService.warn(message);
  }

  clear() {
    this.alertService.clear();
  }
  Upload() {
   // document.getElementById("btnuploadfile").nodeValue = "";
    this.clear();
    this._spinner.show();
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
      
      this._spinner.hide();
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  Save() {
    this._spinner.show();
    var objList = new Array<ResourceCostDetail>();
    for (var i = 0; i < this.gridData.length; i++) {
      objList.push(new ResourceCostDetail(this.gridData[i]));
    }
    this._uploadservice
      .UploadData(objList)
      .subscribe(
      (success) => {
        this.success("Data Saved Successfully");
        this._spinner.hide();
      },
      (error) => {
        this.error("Oops! Somethings went wrong. Please try again later.");
        this._spinner.hide();
      }
      );
    this.isdisabled = false;
    this.uploadfile = true;
  }
}
