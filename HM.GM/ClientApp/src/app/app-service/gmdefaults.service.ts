import { Injectable } from '@angular/core';
 import {Http, Response} from "@angular/http";
 import {Observable} from "rxjs/Observable";
 import "rxjs/Rx";
 import { GMDefaults } from "../Model/GMDefaults";
@Injectable()
export class GmdefaultsService {
    private _postsURL = "http://localhost:5000/api/GMDefaults";

    constructor(private http: Http) {
    }
    
    getPosts(): Observable<GMDefaults[]> {
         return this.http
             .get(this._postsURL)
             .map((response: Response) => {
                 return <GMDefaults[]>response.json();
             })
             .catch(this.handleError);
     }
     
     public getBillRate() : Observable<GMDefaults[]> {
        return this.http
          .get(this._postsURL)
          .map(response => {
            const rates = response.json();
            return rates.map((GMDefaults) => new GMDefaults(rates));
          })
          .catch(this.handleError);
     }

     private handleError(error: Response) {
         return Observable.throw(error.statusText);
     }
}