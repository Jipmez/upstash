import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataService } from '../../../data.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { catchError } from 'rxjs/operators';
import {
  LocalStorageService,
  SessionStorageService,
  LocalStorage,
  SessionStorage,
} from 'angular-web-storage';

@Injectable({
  providedIn: 'root',
})
export class DashcontentserviceService implements Resolve<any> {
  foo = 'rijij';
  user: any;
  cookieValue: string;
  path;
  constructor(
    public session: SessionStorageService,
    private server: DataService,
    private cookieService: CookieService,
    private httpClient: HttpClient
  ) {
    this.path = this.server.Getpath();
  }

  resolve(): Observable<any> {
    this.cookieValue = this.session.get('sessionID');

    let load = {
      val: this.cookieValue,
      key: 'load',
    };

    let me = {
      Id: this.cookieValue,
      key: 'user',
    };

    return forkJoin([
      this.httpClient.post(this.path, load),
      this.httpClient.post(this.path, me).catch((error) => {
        /* if(error.status === 404) {
              this.router.navigate(['subscription-create']);
          } */

        return Observable.throw(error);
      }),
    ]).map((result) => {
      console.log(result);
      return {
        types: result[0],
        dep: result[1],
      };
    });

    /*  return this.httpClient.post(this.path, load).pipe(
      map(dataFromApi => dataFromApi),
      catchError(err => Observable.throw(err.json().error))
    ); */
  }
}
