import { Injectable, Renderer2, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { SessionStorageService } from 'angular-web-storage';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private serviceBoy: HttpClient,
    public session: SessionStorageService,
    private nav: Router,
    private cookieService: CookieService,
    @Inject(DOCUMENT) private _document: Document
  ) {}
  Coinpath: string = 'http://localhost/street/generate.php';
  path: string = 'http://localhost/street/baseApi.php';

  Api(x) {
    return this.serviceBoy.post(this.path, x);
  }

  Pay(x) {
    return this.serviceBoy.post(this.Coinpath, x);
  }

  Getpath() {
    return this.path;
  }

  CheckLogin() {
    if (this.session.get('sessionID')) {
      return true;
    } else {
      this.nav.navigate(['']);
    }
  }

  get isLoggedIn(): boolean {
    let authToken = this.session.get('sessionID');
    return authToken !== null ? true : false;
  }

  logOut() {
    let id = this.session.get('sessionID');
    if (id) {
      this.session.remove('sessionID');
      if (this.session.get('sessionID') == null) {
        this.nav.navigate(['']);
      }
    }
  }

  AlogOut() {
    let id = this.session.get('adminID');
    if (id) {
      this.session.remove('adminID');
      if (this.session.get('adminID') == null) {
        this.nav.navigate(['']);
      }
    }
  }

  public render(renderer2: Renderer2, path: string): void {
    let x = renderer2.createElement('script');
    x.type = 'text/javascript';
    //script.text = `${JSON.stringify(data)}`;
    x.src = path;
    renderer2.appendChild(this._document.body, x);
  }
}
