import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ServerDataSource } from 'ng2-smart-table';
import { Http } from '@angular/http';
import { GmdefaultsService } from '../../app-service';
import {
  GMDefaultModel, ResourceCostDetail,
  OrgMetaData, ResourceCostModel, GMCalculationParams
} from "../../Model";
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-gmdefault',
  templateUrl: './gmdefault.component.html',
  styleUrls: ['./gmdefault.component.css']
})
export class GMdefaultComponent implements OnInit {
  title = 'app';
  excelData: any = [{}];
  settings = {
    delete: {
      confirmDelete: true,
    },
    //add: {
    //  confirmCreate: true,
    //},
    edit: {
      confirmSave: true,
    },
    columns: {
      //id: {
      //  title: 'ID',
      //  editable: false,
      //  addable: false,
      //  filter: false,

      //},
      Location: {
        title: 'Location',
        type: 'html',
        filter: false,
        editor: {
          type: 'completer',
          config: {
            completer: {
              data: [{ name: "Onsite" }, { name: "OffShore" }],
              searchFields: 'name',
              titleField: 'name',
            },
          },
        },
      },
      Practice: {
        title: 'Practice',
        filter: false,
        editor: {
          type: 'completer',
          config: {
            completer: {
              data: [],
              searchFields: 'name',
              titleField: 'name',
            },
          },
        },
      },
      Skill: {
        title: 'Skill',
        filter: false,
        editor: {
          type: 'completer',
          config: {
            completer: {
              data: [],
              searchFields: 'name',
              titleField: 'name',
            },
          },
        },
      },
      Competency: {
        title: 'Competency',
        filter: false,
        editor: {
          type: 'completer',
          config: {
            completer: {
              data: [],
              searchFields: 'name',
              titleField: 'name',
            },
          },
        },
      },
      PercentageLoading: {
        title: '% Loading',
        filter: false,
        defaultValue: "0",
        type: "number",
      },
      RatePerHour: {
        title: 'Rate Card/Hr',
        filter: false,
        defaultValue: "0",
        type: "number",
      },
      WeeksActualLoading: {
        title: 'Weeks (Actual loading)',
        filter: false,
        defaultValue: "0",
        type: "number",
      },
      MonthLoadingWithContengency: {
        title: "Months Loading + Contengency",
        filter: false,
        defaultValue: "0",
        type: "number",
      },
      TotalBilling: {
        title: "Total Billing",
        editable: false,
        addable: false,
        filter: false,
        defaultValue: "0",
        type: "number",
      },
      OnsiteCost: {
        title: "Onsite Cost",
        defaultValue: "0",
        filter: false,
        type: "number",
      },
      OnsitePerdim: {
        title: "Onsite Perdim",
        editable: false,
        addable: false,
        filter: false,
        show: false,
        defaultValue: "0",
        type: "number",
      },

      TotalGMInPercentage: {
        title: "Total GM%",
        editable: false,
        addable: false,
        filter: false,
        defaultValue: "0",
        type: "number",
      },
    }
  };
  public gmdefaults: GMDefaultModel;
  source: LocalDataSource;
  public TotalGMPercentage: number = 0
  public TotalBilling: number = 0
  public TotalOnSiteCost: number = 0
  public gmMasterData: ResourceCostDetail[];
  public orgmetadata: OrgMetaData;
  public complete: boolean = false;
  public gridData: GMCalculationParams[];
  //gmdefaults = {
  //  Contengency: 0
  //}
  constructor(protected service: GmdefaultsService) {
    this.source = new LocalDataSource();
    this.gridData = [];
  }

  ngOnInit() {
    this.service
      .getGMDefaults()
      .subscribe(
      (defaults) => {
        this.gmdefaults = defaults;
        //const data = defaults;
      }
      );
    this.service
      .getOrgMetaData()
      .subscribe(
      (defaults) => {
        this.orgmetadata = defaults;
        if (this.orgmetadata) {
          this.orgmetadata.Competencies.forEach((item) => { // competencies
            this.settings.columns.Competency.editor.config.completer.data.push({ name: item });
          });
          this.orgmetadata.Skills.forEach((item) => { // skills
            this.settings.columns.Skill.editor.config.completer.data.push({ name: item });
          });
          this.orgmetadata.Practices.forEach((item) => { // Practice
            this.settings.columns.Practice.editor.config.completer.data.push({ name: item });
          });
          this.complete = true;
        }
      }
      );
  }

  onCreateConfirm(event) {
    //if (window.confirm('Are you sure you want to create?')) {
    event.confirm.resolve(event.newData);
    this.gridData.push(event.newData);
    //} else {
    //  event.confirm.reject();
    //}
  }
  public onDefaultSubmit() {
    console.log("Form Submitted!");

  };

  private financial(x: number): number {
    return parseInt(Number.parseFloat(x.toString()).toFixed(2));
  }

  public Save() {
    var localdata = new LocalDataSource(this.gridData);
    var objList = new Array<GMCalculationParams>();
    for (var i = 0; i < this.gridData.length; i++) {
      objList.push(new GMCalculationParams(this.gridData[i].Competency, this.gridData[i].Location,
        this.gridData[i].Practice, this.gridData[i].Skill,
        parseFloat(this.gridData[i].PercentageLoading.toString()), parseFloat(this.gridData[i].RatePerHour.toString()),
        parseFloat(this.gridData[i].WeeksActualLoading.toString()), 0, parseFloat(this.gridData[i].OnsiteCost.toString()),
        parseFloat(this.gridData[i].MonthLoadingWithContengency.toString()), 0,
        0));
    }
    this.service.UploadData(objList, this.gmdefaults).subscribe(
      (defaults) => {
        var data = defaults;
        this.excelData = data.GMCalculationParams;
        this.gridData = data.GMCalculationParams;
        for (var i = 0; i < this.gridData.length; i++) {
          this.TotalGMPercentage = this.TotalGMPercentage + this.gridData[i].TotalGMInPercentage;
          this.TotalBilling = this.TotalBilling + this.gridData[i].TotalBilling;
          this.TotalOnSiteCost = this.TotalOnSiteCost + this.gridData[i].OnsiteCost;

          this.gridData[i].TotalBilling = this.financial(this.gridData[i].TotalBilling); //parseFloat(this.gridData[i].TotalBilling.toString()).toFixed(2);
          this.gridData[i].MonthLoadingWithContengency = this.financial(this.gridData[i].MonthLoadingWithContengency);
          this.gridData[i].OnsiteCost = this.financial(this.gridData[i].OnsiteCost);
          this.gridData[i].TotalGMInPercentage = this.financial(this.gridData[i].TotalGMInPercentage);
        }
        this.TotalGMPercentage = this.TotalGMPercentage / this.gridData.length;
        this.source = new LocalDataSource(data.GMCalculationParams);
      }
    );

  }

  public tableToExcel(table: any, name: any) {
    //var uri = 'data:application/vnd.ms-excel;base64,'
    //  , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    //  , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
    //  , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    //if (!table.nodeType) table = document.getElementById(table)
    //var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
    //window.location.href = uri + base64(format(template, ctx))
  }
  public rowKeys(row: any): Array<string> {
    return Object.keys(row);
  }
}
