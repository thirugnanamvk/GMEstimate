import { Component, ViewContainerRef  } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { BehaviorSubject } from 'rxjs';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ResourceCostDetailVM } from '../Model/ResourceCostDetailVM';
import { ResourceCostDetail } from '../Model/ResourceCostDetail';
import { HttpClient } from '@angular/common/http';
import { Uploadservice, AlertService } from '../app-service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { error } from 'protractor';

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

  constructor(private http: HttpClient, private _uploadservice: Uploadservice, private alertService: AlertService, public toastr: ToastsManager, vcr: ViewContainerRef, private spinnerService: Ng4LoadingSpinnerService ) {
    this.source = new LocalDataSource(this.gridData);
    this.toastr.setRootViewContainerRef(vcr);
  }

  showSuccess() {
    this.toastr.success('<span style="color: green" > Data Saved Sucessfully</span>', null, { enableHTML: true });
  }
  showError() {
    this.toastr.error('<span style="color: red"> Data was not sucessfully Loaded</span>', null, { enableHTML: true });
  } 

  incomingfile(event: any) {
    this.file = event.target.files[0];
  }

  Upload() {
    this.spinnerService.show();
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
      this.spinnerService.hide();
    }
    fileReader.readAsArrayBuffer(this.file);
  }

  Save() {
    this.spinnerService.show();
    var objList = new Array<ResourceCostDetail>();
    for (var i = 0; i < this.gridData.length; i++) {
      objList.push(new ResourceCostDetail(this.gridData[i]));
    }
    this._uploadservice
      .UploadData(objList)
      .subscribe(
      (success) => {
        this.showSuccess()
      },
      (error) => {
        this.showError()
      }
      );
    this.spinnerService.hide();
    this.isdisabled = false;

  }
}
