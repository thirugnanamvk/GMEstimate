import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";
import { GMDefaultModel, ResourceCostDetail, OrgMetaData, GMCalculationParams, GMInput, UserAccess } from "../Model";

@Injectable()
export class GmdefaultsService {
  private _url = "api/GMEstimation";

  constructor(private http: Http) {
  }

  getGMDefaults(): Observable<GMDefaultModel> {
    return this.http
      .get(this._url + "/GMDefaults")
      .map((response: Response) => {
        return <GMDefaultModel>response.json();
      })
      .catch(this.handleError);
  }
  getResourceCostDetails(): Observable<ResourceCostDetail[]> {
    return this.http
      .get(this._url )
      .map((response: Response) => {
        return <GMDefaultModel[]>response.json();
      })
      .catch(this.handleError);
  }

  getOrgMetaData(): Observable<OrgMetaData> {
    return this.http
      .get(this._url + "/orgMetadata")
      .map((response: Response) => {
        return <OrgMetaData>response.json();
      })
      .catch(this.handleError);
  }

  UploadData(data: Array<GMCalculationParams>, gmdefault: GMDefaultModel): Observable<GMInput> {
    var inputdata = new GMInput();
    inputdata.GMCalculationParams = data;
    inputdata.GMDefaults = gmdefault;
    return this.http
      .post(this._url + "/calculateGM", inputdata).map((response: Response) => { return <GMInput>response.json(); }).catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

   getUseraccess(userAccess: UserAccess): Observable<UserAccess> {
    return this.http
      .post(this._url + "/getUserAccess", userAccess).map((response: Response) => { return <UserAccess>response.json(); }).catch(this.handleError);
  } 
}
