import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { ResourceCostDetail } from '../Model/ResourceCostDetail';

@Injectable()
export class Uploadservice {
  url = "api/GMEstimation";
  constructor(private http: Http) { }

  UploadData(data: Array<ResourceCostDetail>): Promise<any> {
    console.log(data);
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    return new Promise((resolve, reject) => {
      this.http.post(this.url, data).subscribe(res => { resolve(res) });
    })
  }	  
}
