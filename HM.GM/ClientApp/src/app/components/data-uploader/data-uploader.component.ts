import { Component, ViewContainerRef } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { BehaviorSubject } from 'rxjs';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ResourceCostDetail } from '../../model';
import { HttpClient } from '@angular/common/http';
import { UploadDataService, AlertService } from '../../services';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { error } from 'protractor';

@Component({
  selector: 'app-data-uploader',
  templateUrl: './data-uploader.component.html',
  styleUrls: ['./data-uploader.component.css']
})
export class DataUploaderComponent {

  private arrayBuffer: any;
  public isDisabled: boolean = false;
  public gridData: ResourceCostDetail[];
  public file: File;
  public source: LocalDataSource;
  public uploadfile: boolean = true;

  public settings = {
    actions: false,
    columns: {

      Practice: {
        title: 'Practice'
      },
      Skill: {
        title: 'Skillset'
      },
      Competency: {
        title: 'Competency'
      },
      OnsiteCost: {
        title: 'USDHrOnsite',
        valuePrepareFunction: function (c, r) {
          if (!c) return 0;
          else return c;
        }
      },
      OffshoreCost: {
        title: 'USDHrOffshore',
        valuePrepareFunction: function (c, r) {
          if (!c) return 0;
          else return c;
        }
      }
    }
  };

  constructor(private http: HttpClient, private _uploadservice: UploadDataService, private alertService: AlertService, vcr: ViewContainerRef, private _spinner: Ng4LoadingSpinnerService) {
    this.source = new LocalDataSource(this.gridData);
  }

  public incomingfile(event: any) {
    this.file = event.target.files[0];
    this.clear();
    this.uploadfile = false;
  }

  public success(message: string) {
    this.alertService.success(message);
  }

  public error(message: string) {
    this.alertService.error(message);
  }

  public info(message: string) {
    this.alertService.info(message);
  }

  public warn(message: string) {
    this.alertService.warn(message);
  }

  public clear() {
    this.alertService.clear();
  }

  public Upload() {
    this.clear();
    this._spinner.show();
    this.isDisabled = true;
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

  public uploadData() {
    this._spinner.show();
    var objList = new Array<ResourceCostDetail>();
    for (var i = 0; i < this.gridData.length; i++) {
      objList.push(this.gridData[i]);
    }

    this._uploadservice.UploadData(objList).subscribe
    (
      (success) => {
        this.success("Data Uploaded Successfully");
        this._spinner.hide();
      },
      (error) => {
        this.error("Oops! Somethings went wrong. Please try again later.");
        this._spinner.hide();
        this.isDisabled = true;
      }
    );
    this.isDisabled = false;
    this.uploadfile = true;
  }
}
