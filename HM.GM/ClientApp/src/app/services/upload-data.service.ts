import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { ResourceCostDetail } from '../model/ResourceCostDetail';
import { Observable } from "rxjs/Observable";
import { ResourceCostModel } from '../model';

@Injectable()
export class UploadDataService {
  url = "api/GMEstimation";
  constructor(private http: Http) { }

  UploadData(costDetails: Array<ResourceCostDetail>): Observable<any> {
    return this.http.post(this.url, costDetails).map((response: Response) => { return response; }).catch(this.handleError);
  }
  GetData(): Observable<ResourceCostDetail[]> {
     return this.http.
       get(this.url + "/GetGMDefaults")
       .map((response: Response) => {
         return <ResourceCostModel[]>response.json();
       })
       .catch(this.handleError);


  }

  InsertResource(costDetails: Array<ResourceCostDetail>): Observable<void> {
    console.log("data", costDetails);
    console.log("url", this.url);
    return this.http.post(this.url, costDetails)
      .map((response: Response) => {
        return <boolean>response.json();
      })
      .catch(this.handleError);
  }

  DeleteResource(costDetails: Array<ResourceCostDetail>): Observable<any> {
    return this.http.delete(this.url, new RequestOptions({
      body: costDetails
    })).map((response: Response) => { return response; }).catch(this.handleError);
  }

  UpdateResource(data: Array<ResourceCostDetail>): Observable<any> {
    return this.http.put(this.url, data).map((response: Response) => { return response; }).catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
