import { Component, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DOCUMENT } from '@angular/common';
import { DataService } from '../../../data.service';
import { Router } from '@angular/router';
import {
  LocalStorageService,
  SessionStorageService,
  LocalStorage,
  SessionStorage,
} from 'angular-web-storage';

declare let $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private server: DataService,
    private toastr: ToastrManager,
    public cookieService: CookieService,
    public session: SessionStorageService,
    private route: Router,
    vcr: ViewContainerRef,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit() {
    $('.loader').fadeOut();
    $('#preloder').delay(400).fadeOut('slow');

    $('.toggle-password').click(function () {
      $(this).toggleClass('fa-eye fa-eye-slash');
      var input = $('#me');
      if (input.attr('type') == 'password') {
        input.attr('type', 'text');
      } else {
        input.attr('type', 'password');
      }
    });
  }

  store() {
    //this.cookieService.set("eiee", "me");
    this.session.set('sessionID', 'iiiuieui');
  }

  deletet() {
    this.session.remove('sessionID');
  }

  getet() {
    let me = this.session.get('sessionID');
    console.log(me);
  }

  logIn(x: NgForm) {
    var emailRe = /^.+@.+\..{2,4}$/;

    if (x.value.email.match(emailRe)) {
      let comingUser = [x.value.email, x.value.password];

      let err = ['email', 'wiwoo'];

      let p = 0;
      let count = 0;

      while (p < comingUser.length) {
        if (comingUser[p].length < 4) {
          this.toastr.warningToastr(err[p] + 'is empty');
          break;
        } else {
          count++;
        }
        p++;
      }

      if (count == comingUser.length) {
        let logInfo = {
          email: x.value.email,
          password: x.value.password,
          key: 'log',
        };
        this.server.Api(logInfo).subscribe(
          (res) => {
            if (res['code'] == 1) {
              this.toastr.successToastr(res['message'], 'Security center');
              let bag = res['token'];
              this.session.set('sessionID', bag);
              // this.cookieService.set("logID", bag);

              this.route.navigate(['dashboard']);
            }

            if (res['code'] == 2) {
              this.toastr.successToastr(
                res['message'],
                'Redirecting to dashboard'
              );
              let bag = res['token'];
              this.session.set('adminID', bag);
              this.route.navigate(['hkgjiinif684080ngi98084g06']);
            }

            if (res['code'] == 3) {
              this.toastr.warningToastr(res['message'], 'Security center');
            }
          },
          () => {},
          () => {}
        );
      }
    } else {
    }
  }
}
