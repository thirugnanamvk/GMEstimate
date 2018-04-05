export class GMCalculationParams {
  constructor(_Competency: string, _Location: string, _Practice: string, _Skill: string, _PercentageLoading: number,
          _RatePerHour: number, _WeeksActualLoading: number, _OnsitePerdim: number, _OnsiteCost: number,
    _MonthLoadingWithContengency: number, _TotalBilling: number, _TotalGMInPercentage:number, _noOfMinds: number) {
    this.Competency = _Competency;
    this.Location = _Location;
    this.Practice = _Practice ;
    this.Skill = _Skill ;
    this.PercentageLoading = _PercentageLoading;
    this.RatePerHour = _RatePerHour;
    this.WeeksActualLoading = _WeeksActualLoading;
    this.OnsitePerdim = _OnsitePerdim;
    this.OnsiteCost = _OnsiteCost;
    this.MonthLoadingWithContengency = _MonthLoadingWithContengency ;
    this.TotalBilling = _TotalBilling;
    this.TotalGMInPercentage = _TotalGMInPercentage;
    this.NoOfMinds = _noOfMinds;
  }
  Location: string;
  Practice: string;
  Skill: string;
  Competency: string;
  PercentageLoading: number;
  RatePerHour: number;
  WeeksActualLoading: number;
  OnsitePerdim: number;
  OnsiteCost: number;
  MonthLoadingWithContengency: number;
  TotalBilling: number;
  TotalGMInPercentage: number;
  TotalCost: number;
  NoOfMinds: number;
}
