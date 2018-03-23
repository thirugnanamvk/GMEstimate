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
        filter: false
      },
      RatePerHour: {
        title: 'Rate Card/Hr',
        filter: false
      },
      WeeksActualLoading: {
        title: 'Weeks (Actual loading)',
        filter: false
      },
      MonthLoadingWithContengency: {
        title: "Months Loading + Contengency",
        filter: false
      },
      TotalBilling: {
        title: "Total Billing",
        filter: false
      },
      OnsiteCost: {
        title: "Onsite Cost",
        filter: false
      },
      OnsitePerdim: {
          title: "Onsite Perdim",
          filter: false
        },
      
      TotalGMInPercentage: {
        title: "Total GM%",
        editable: false,
        addable: false,
        filter: false
      },
    }
  };
  public gmdefaults: GMDefaultModel;
  source: LocalDataSource;
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
          this.orgmetadata.competencies.forEach((item) => { // competencies
            this.settings.columns.Competency.editor.config.completer.data.push({ name: item });
          });
          this.orgmetadata.skills.forEach((item) => { // skills
            this.settings.columns.Skill.editor.config.completer.data.push({ name: item });
          });
          this.orgmetadata.practices.forEach((item) => { // Practice
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
        this.gridData = data.GMCalculationParams;
        this.source = new LocalDataSource(data.GMCalculationParams);
      }
    );
  }
}
