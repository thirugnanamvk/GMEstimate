import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { GMDefaultModel, ResourceCostDetail, OrgMetaData, GMCalculationParams, GMInput } from "../Model";

@Injectable()
export class GmdefaultsService {
  private _postsURL = "api/GMEstimation";

  constructor(private http: Http) {
  }

  getGMDefaults(): Observable<GMDefaultModel> {
    return this.http
      .get(this._postsURL + "/GMDefaults")
      .map((response: Response) => {
        return <GMDefaultModel>response.json();
      })
      .catch(this.handleError);
  }
  getResourceCostDetails(): Observable<ResourceCostDetail[]> {
    return this.http
      .get(this._postsURL + "/GetResourceCostDetails")
      .map((response: Response) => {
        return <GMDefaultModel[]>response.json();
      })
      .catch(this.handleError);
  }

  getOrgMetaData(): Observable<OrgMetaData> {
    return this.http
      .get(this._postsURL + "/orgMetadata")
      .map((response: Response) => {
        return <OrgMetaData>response.json();
      })
      .catch(this.handleError);
  }

  UploadData(data: Array<GMCalculationParams>, gmdefault: GMDefaultModel): Observable<GMInput> {
    console.log(data);
    var inputdata = new GMInput();
    inputdata.GMCalculationParams = data;
    inputdata.GMDefaults = gmdefault;
    console.log(inputdata);
    //return new Promise((resolve, reject) => {
    //  this.http.post(this._postsURL + "/calculateGM", inputdata).subscribe(res => { resolve(res) })
    //});
    return this.http
      .post(this._postsURL + "/calculateGM", inputdata).map((response: Response) => { return <GMInput>response.json(); }).catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
