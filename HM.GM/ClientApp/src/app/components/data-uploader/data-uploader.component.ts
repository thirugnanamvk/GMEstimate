import { Component, ViewContainerRef, OnInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { BehaviorSubject } from 'rxjs';
import { ResourceCostDetail, ResourceCostDetailList } from '../../model';
import { HttpClient } from '@angular/common/http';
import { UploadDataService, AlertService, PagerService } from '../../services';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { error } from 'protractor';
import { GmFilterPipe } from '../gm-filter/gm-filter.pipe';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-data-uploader',
  templateUrl: './data-uploader.component.html',
  styleUrls: ['./data-uploader.component.css']
})
export class DataUploaderComponent implements OnInit {

  private arrayBuffer: any;
  public isUploadDataDisabled: boolean = false;
  public gridData: ResourceCostDetail[];
  public file: File;
  public uploadFile: boolean = true;
  public Isdeleted: Array<number>;
  public saveDisabled: boolean = true;
  public showUploadDiv: boolean = false;
  public queryStringPractice: any;
  public queryStringCompetency: any;
  public queryStringSkill: any;
  public resourceCostDetailList: ResourceCostDetailList = new ResourceCostDetailList();
  constructor(private http: HttpClient, private _uploadservice: UploadDataService, private alertService: AlertService, vcr: ViewContainerRef, private _spinner: Ng4LoadingSpinnerService, private pagerService: PagerService) {
    this.gridData = [];
  }


  ngOnInit(): void {
    this.getDataFromDb();
  }

  public incomingfile(event: any) {
    this.file = event.target.files[0];
    this.clear();
    this.uploadFile = false;
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

  public validate(): boolean {
    for (var i = 0; i < this.gridData.length; i++) {
      if ((!this.gridData[i].Practice
        || !this.gridData[i].Skill
        || !this.gridData[i].Competency
        || this.gridData[i].OffshoreCost <= 0
        || this.gridData[i].OnsiteCost <= 0)
        && !this.gridData[i].IsDeleted) {
        this.saveDisabled = true;
        return;
      }
    }
    this.saveDisabled = false;
  }

  public importToLocal() {
    this.clear();
    this._spinner.show();
    this.isUploadDataDisabled = true;
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
      this.gridData = XLSX.utils.sheet_to_json<ResourceCostDetail>(worksheet);
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
        this.isUploadDataDisabled = true;
      }
      );
    this.isUploadDataDisabled = false;
    this.uploadFile = true;
  }

  public addFieldValue() {
    this.gridData.unshift(new ResourceCostDetail(0, "", "", "", 0, 0, false, false, true, "", false));
    this.validate();
  }

  public deleteFieldValue(index) {
    if (this.gridData[index].Id != 0) {
      this.gridData[index].IsDeleted = true;
      this.saveDisabled = false;
      this.gridData[index].IsUpdated = false;
    } else {
      this.gridData.splice(index, 1);
    }
    this.validate();
  }

  public updateColIndex(index) {
    if (this.gridData[index].Id != 0) {
      this.gridData[index].IsUpdated = true;
    }
  }

  public getDataFromDb() {
    this._spinner.show();
    this._uploadservice.GetData()
      .subscribe(
      (data) => {
        if (data.length <= 0) {
          this.showUploadDiv = true
        }
        else {
          this.gridData = data;
        }
        this._spinner.hide();
      },
      (error) => {
        this.error("Oops! Somethings went wrong. Please try again later.");
        this._spinner.hide();
        this.isUploadDataDisabled = true;
      });

  }

  public saveData() {
    var requestNew: Array<ResourceCostDetail> = new Array<ResourceCostDetail>();
    var requestUpdate: Array<ResourceCostDetail> = new Array<ResourceCostDetail>();
    var requestDelete: Array<ResourceCostDetail> = new Array<ResourceCostDetail>();

    this.gridData.forEach(function (item) {
      if (item.IsNew)
        requestNew.push(item);
      else if (item.IsUpdated)
        requestUpdate.push(item);
      else if (item.IsDeleted)
        requestDelete.push(item);
    });
    if (requestDelete.length > 0) {
      this.resourceCostDetailList.DeleteCostDetailList = requestDelete;
    }

    if (requestUpdate.length > 0) {
      this.resourceCostDetailList.UpdateCostDetailList = requestUpdate;
    }

    if (requestNew.length > 0) {
      this.resourceCostDetailList.InsertCostDetailList = requestNew;
    }
    if (requestNew.length > 0 || requestUpdate.length > 0 || requestDelete.length > 0) {
      this._spinner.show();
      this._uploadservice.SaveResource(this.resourceCostDetailList).subscribe
        (
        (success) => {
          this.success("Data Saved Successfully");
          this.saveDisabled = true;
          this._spinner.hide();
        },
        (error) => {
          this.error("Oops! Somethings went wrong. Please try again later.");
          this._spinner.hide();
          this.isUploadDataDisabled = true;
        }
        );
    }
  }
}
