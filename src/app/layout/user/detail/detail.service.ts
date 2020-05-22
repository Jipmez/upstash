import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { DataService } from "../../../data.service";
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { forkJoin } from "rxjs/observable/forkJoin";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";

import { SessionStorageService } from "angular-web-storage";

@Injectable({
  providedIn: "root"
})
export class DetailService implements Resolve<any> {
  cookieValue: string;
  path;
  id: any;
  constructor(
    public session: SessionStorageService,
    private server: DataService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    this.path = this.server.Getpath();
  }

  resolve(): Observable<any> {
    this.cookieValue = this.session.get("sessionID");
    this.id = this.route.snapshot.paramMap.get("id");

    let load = {
      val: this.cookieValue,
      inv: this.id,
      key: "inv"
    };

    return forkJoin([
      this.httpClient.post(this.path, load).catch(error => {
        /* if(error.status === 404) {
              this.router.navigate(['subscription-create']);
          } */

        return Observable.throw(error);
      })
    ]).map(result => {
      console.log(result);
      return {
        dep: result[0]
      };
    });
  }
}
