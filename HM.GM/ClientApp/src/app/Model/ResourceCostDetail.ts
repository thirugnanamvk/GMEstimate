import { ResourceCostDetailVM } from './ResourceCostDetailVM';

export class ResourceCostDetail
{
  constructor(objCostDetailVM: ResourceCostDetailVM) {
    this.Competency = objCostDetailVM.Competency;
    this.OffshoreCost = objCostDetailVM.OffshorePerHour;
    this.OnsiteCost = objCostDetailVM.OnsitePerHour;
    this.Practice = objCostDetailVM.Practice;
    this.Skill = objCostDetailVM.Skillset;
  }

   'Practice': string;
   'Skill': string;
   'Competency': string;
   'OnsiteCost': number;
   'OffshoreCost': number;
 }
