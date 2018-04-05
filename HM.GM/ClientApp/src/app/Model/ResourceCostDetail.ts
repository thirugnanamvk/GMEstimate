
export class ResourceCostDetail {
  constructor(_Id: number, _Practice: string, _Skill: string, _Competency: string, _OnsiteCost: number,
    _OffshoreCost: number, _IsUpdated: boolean, _IsDeleted: boolean, _IsNew: boolean, _CreatedBy: string) {
    this.Id = _Id;
    this.Practice = _Practice;
    this.Skill = _Skill;
    this.OnsiteCost = _OnsiteCost;
    this.OffshoreCost = _OffshoreCost;
    this.IsUpdated = _IsUpdated;
    this.IsDeleted = _IsDeleted;
    this.IsNew = _IsNew;
    this.CreatedBy = _CreatedBy;
   // this.CreatedDate = _CreatedDate;
  }
  Id: number;
  Practice: string;
  Skill: string;
  Competency: string;
  OnsiteCost: number;
  OffshoreCost: number;
  IsUpdated: boolean = false;
  IsDeleted: boolean = false;
  IsNew: boolean = false;
  CreatedBy: string;
}
