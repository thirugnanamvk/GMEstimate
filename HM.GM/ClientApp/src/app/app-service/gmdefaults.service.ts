import { Injectable } from '@angular/core';
 import {Http, Response} from "@angular/http";
 import {Observable} from "rxjs/Observable";
 import "rxjs/Rx";
import { GMDefaultModelVM } from "../Model/GMDefaultModelVM";
import { GMDefaultModel } from "../Model/GMDefaultModel";

@Injectable()
export class GmdefaultsService {  
  private _postsURL = "api/GMEstimation/GMDefaults";

    constructor(private http: Http) {
    }
    
  getPosts(): Observable<GMDefaultModelVM[]> {
         return this.http
             .get(this._postsURL)
             .map((response: Response) => {
               return <GMDefaultModelVM[]>response.json();
             })
             .catch(this.handleError);
     }
     
  public getBillRate(): Observable<GMDefaultModel> {
        return this.http
          .get(this._postsURL)
          .map(response => {
            return new GMDefaultModel(response.json());
          })
          .catch(this.handleError);
     }

     private handleError(error: Response) {
         return Observable.throw(error.statusText);
     }
}
