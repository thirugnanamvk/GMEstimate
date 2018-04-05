import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { ResourceCostDetail } from '../model/ResourceCostDetail';
import { Observable } from "rxjs/Observable";
import { SaveResourceCostDetail } from '../model';

@Injectable()
export class UploadDataService {
  url = "api/GMEstimation";
  constructor(private http: Http) { }

  UploadData(costDetails: Array<ResourceCostDetail>): Observable<any> {
    return this.http.post(this.url, costDetails).map((response: Response) => { return response; }).catch(this.handleError);
  }
  GetData(): Observable<ResourceCostDetail[]> {
    return this.http
      .get(this.url)
       .map((response: Response) => {
         return <ResourceCostDetail[]>response.json();
       })
       .catch(this.handleError);


  }

  //InsertResource(costDetails: Array<ResourceCostDetail>): Observable<ResourceCostDetail[]> {
  //  return this.http.post(this.url, costDetails)
  //    .map((response: Response) => {
  //      return <ResourceCostDetail>response.json();
  //    })
  //    .catch(this.handleError);
  //}

  //DeleteResource(costDetails: Array<ResourceCostDetail>): Observable<any> {
  //  return this.http.delete(this.url + "/deleteResourceCost", new RequestOptions({
  //    body: costDetails
  //  })).map((response: Response) => { return response; }).catch(this.handleError);
  //}

  //UpdateResource(data: Array<ResourceCostDetail>): Observable<any> {

  //  return this.http.put(this.url +"/updateResourceCost", data).map((response: Response) => { return response; }).catch(this.handleError);
  //}
  SaveResource(data: SaveResourceCostDetail): Observable<any> {
    return this.http
      .post(this.url + "/SaveResourceCostChanges", data)
      .map((response: Response) => { return response; })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
