import { GMDefaultModelVM } from './GMDefaultModelVM';
export class GMDefaultModel {
  constructor(objGMDefault: GMDefaultModelVM) {
    this.Contengency = objGMDefault.Contengency;
    this.DaysPerMonth = objGMDefault.HoursPerDay;
    this.DaysPerWeek = objGMDefault.DaysPerWeek;
    this.DaysPerMonth = objGMDefault.DaysPerMonth;
    this.WeeksPerMonth = objGMDefault.WeeksPerMonth;
    this.DollarValueInINR = objGMDefault.DollarValueInINR;
    
}
    Contengency: number;
    HoursPerDay: number;
    DaysPerWeek: number;
    DaysPerMonth: number;
    WeeksPerMonth: number;
    DollarValueInINR: number;
}
