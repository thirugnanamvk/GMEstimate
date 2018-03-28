export class ResourceCostDetail
{
  constructor(_Practice: string, _Skill: string, _Competency: string, _OnsiteRate: number,
    _OffshoreRate: number) {
    this.Practice = _Practice;
    this.Skill = _Skill;
    this.OnsiteRate = _OnsiteRate;
    this.OffshoreRate = _OffshoreRate;
    
  }
   Id: number;
   Practice: string;
   Skill: string;
   Competency: string;
  OnsiteRate: number;
  OffshoreRate: number;
 }
