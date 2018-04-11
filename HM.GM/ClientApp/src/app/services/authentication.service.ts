import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  getUser(): Observable<string> {
    let serviceUrl: string = 'api/WinAuth/getuser';
    return this.http.get(serviceUrl, { responseType: 'text' })
      .map((rslt: string) => {
        return rslt;
      });
  }

}
