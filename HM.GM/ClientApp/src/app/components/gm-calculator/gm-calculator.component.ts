import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { GmCalculatorService } from '../../services';
import { GMDefaultModel, ResourceCostDetail, OrgMetaData, ResourceCostModel, GMCalculationParams } from "../../model";
import { NgModule } from '@angular/core';
declare function unescape(s: string): string;
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-gm-calculator',
  templateUrl: './gm-calculator.component.html',
  styleUrls: ['./gm-calculator.component.css']
})
export class GmCalculatorComponent implements OnInit {

  public gmdefaults: GMDefaultModel = new GMDefaultModel();
  public enableExport: boolean = false;
  public excelData: any = [{}];
  public TotalGMPercentage: number = 0
  public TotalBilling: number = 0
  public TotalOnSiteCost: number = 0
  public TotalCost: number = 0;
  public gmMasterData: ResourceCostDetail[];
  public orgmetadata: OrgMetaData;
  public complete: boolean = false;
  public gridData: Array<GMCalculationParams> = [];
  public location = ["OnSite", "OffShore"];
  public savedisabled: boolean = true;
  public newAttribute: GMCalculationParams = new GMCalculationParams("", "", "", "", undefined, undefined, undefined, undefined, 0, 0, undefined, undefined);

  constructor(protected service: GmCalculatorService, protected _spinner: Ng4LoadingSpinnerService) {
    this.gridData = [];
  }

  public addFieldValue() {
    this.gridData.push(this.newAttribute)
    this.newAttribute = new GMCalculationParams("", "", "", "", undefined, undefined, undefined, undefined, 0, 0, undefined, undefined);
    this.savedisabled = true;
  }

  public deleteFieldValue(index) {
    this.gridData.splice(index, 1);
    this.calculateTotal();
  }

  ngOnInit() {
    this.service
      .getGMDefaults()
      .subscribe(
      (defaults) => {
        this.gmdefaults = defaults;
      }
      );
    this.service
      .getOrgMetaData()
      .subscribe(
      (defaults) => {
        this.orgmetadata = defaults;
      }
      );
  }

  public validate(): boolean {
    for (var i = 0; i < this.gridData.length; i++) {
      if ((this.gridData[i].Location) && this.gridData[i].Practice && this.gridData[i].Skill &&
        this.gridData[i].Competency
        && (this.gridData[i].PercentageLoading && this.gridData[i].PercentageLoading > 0)
        && (this.gridData[i].RatePerHour && this.gridData[i].RatePerHour >= 0)
        && (this.gridData[i].WeeksActualLoading && this.gridData[i].WeeksActualLoading >= 0)) {
        this.savedisabled = false;
        return false;
      }
    }
    this.savedisabled = true;
  }

  public calculateGM() {
    this._spinner.show();
    var objList = new Array<GMCalculationParams>();
    for (var i = 0; i < this.gridData.length; i++) {
      objList.push(new GMCalculationParams(this.gridData[i].Competency, this.gridData[i].Location,
        this.gridData[i].Practice, this.gridData[i].Skill,
        parseFloat(this.gridData[i].PercentageLoading.toString()), parseFloat(this.gridData[i].RatePerHour.toString()),
        parseFloat(this.gridData[i].WeeksActualLoading.toString()), 0, parseFloat(this.gridData[i].OnsiteCost.toString()),
        parseFloat(this.gridData[i].MonthLoadingWithContengency.toString()), 0,
        0));
    }

    this.service.UploadData(objList, this.gmdefaults).subscribe
    (
      (defaults) => {
          var data = defaults;
          if (data.ErrorMessage == '') {
            this.excelData = data.GMCalculationParams;
            this.gridData = data.GMCalculationParams;
            this.calculateTotal();
            this.enableExport = true;
            this._spinner.hide();
        }
        else {
          alert(data.ErrorMessage);
          this.savedisabled = true;
          this._spinner.hide();
        }
      }
    );
  }

  public tableToExcel(table: any, name: any) {
    this._spinner.show();
    var uri = 'data:application/vnd.ms-excel;base64,'
      , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
      , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
      , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
    window.location.href = uri + base64(format(template, ctx))
    this._spinner.hide();
  }

  public rowKeys(row: any): Array<string> {
    return Object.keys(row);
  }

  public resetAll() {
    this.newAttribute = new GMCalculationParams("", "", "", "", undefined, undefined, undefined, undefined, 0, 0, undefined, undefined);
    this.gridData = [];
    this.calculateTotal();
    this.enableExport = false;
    this.savedisabled = true;
  }

  private calculateTotal() {
    this._spinner.show();
    this.TotalGMPercentage = 0;
    this.TotalBilling = 0;
    this.TotalOnSiteCost = 0;
    this.TotalCost = 0;
    for (var i = 0; i < this.gridData.length; i++) {
      this.TotalGMPercentage = this.TotalGMPercentage + this.gridData[i].TotalGMInPercentage;
      this.TotalBilling = this.TotalBilling + this.gridData[i].TotalBilling;
      this.TotalOnSiteCost = this.TotalOnSiteCost + this.gridData[i].OnsiteCost;
      this.TotalCost = this.TotalCost + this.gridData[i].TotalCost;
    }
    this.TotalGMPercentage = ((this.TotalBilling - this.TotalCost) / this.TotalBilling) * 100;
    this._spinner.hide();
  }

}