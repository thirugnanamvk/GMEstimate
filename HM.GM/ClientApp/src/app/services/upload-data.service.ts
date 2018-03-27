import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { ResourceCostDetail } from '../model/ResourceCostDetail';
import { Observable } from "rxjs/Observable";

@Injectable()
export class UploadDataService {
  url = "api/GMEstimation";
  constructor(private http: Http) { }

  UploadData(data: Array<ResourceCostDetail>): Observable<any> {
    return this.http.post(this.url, data).map((response: Response) => { return response; }).catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
