import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DataService } from '../../../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  LocalStorageService,
  SessionStorageService,
  LocalStorage,
  SessionStorage,
} from 'angular-web-storage';
declare let $;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  login = [];
  order: any;
  constructor(
    private server: DataService,
    private toastr: ToastrManager,
    public cookieService: CookieService,
    public session: SessionStorageService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.queryParams
      .filter((params) => params.ref)
      .subscribe((params) => {
        console.log(params); // {order: "popular"}

        this.order = params.ref;
        console.log(this.order); // popular
      });

    $('.toggle-password').click(function () {
      $(this).toggleClass('fa-eye fa-eye-slash');
      var input = $('#id_pass');
      if (input.attr('type') == 'password') {
        input.attr('type', 'text');
      } else {
        input.attr('type', 'password');
      }
    });
  }

  show() {
    $('.toggle-pasword').toggleClass('fa-eye fa-eye-slash');
    var input = $('#c_pass');
    if (input.attr('type') == 'password') {
      input.attr('type', 'text');
    } else {
      input.attr('type', 'password');
    }
  }

  analyzeFullname(x) {
    if (x.length < 2) {
      document.getElementById('id_full').style.borderBottom = '2px solid red';
    } else {
      document.getElementById('id_full').style.borderBottom = '2px solid green';
    }
  }

  analyzeUsername(x) {
    var nameRe = /^[A-Z \'.-]{2,40}$/i;
    if (!x.match(nameRe)) {
      document.getElementById('id_user').style.borderBottom = '2px solid red';
    } else {
      document.getElementById('id_user').style.borderBottom = '2px solid green';
    }
  }

  checkAdress(x) {
    if (x.length < 2) {
      document.getElementById('id_add').style.borderBottom = '2px solid red';
    } else {
      document.getElementById('id_add').style.borderBottom = '2px solid green';
    }
  }

  checkMail(x) {
    var strongEmail = /^.+@.+..{2,4}$/;

    if (x.match(strongEmail)) {
      document.getElementById('id_email').style.borderBottom =
        '2px solid green';
    } else {
      document.getElementById('id_email').style.borderBottom = '2px solid red';
    }
  }

  analyze(x) {
    var strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    var mediumRegex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );
    if (strongRegex.test(x)) {
      document.getElementById('id_pass').style.borderBottom = '2px solid green';
    } else if (mediumRegex.test(x)) {
      document.getElementById('id_pass').style.borderBottom =
        '2px solid orange';
    } else {
      document.getElementById('id_pass').style.borderBottom = '2px solid red';
    }
  }

  Reg(x: NgForm) {
    console.log(x.value);
    var nameRe = /^[A-Z \'.-]{2,40}$/i;
    var emailRe = /^.+@.+\..{2,4}$/;

    if (!x.value.email.match(emailRe)) {
      this.toastr.errorToastr('Please input a correct email');
    }

    if (!x.value.username.match(nameRe)) {
      this.toastr.errorToastr('Username error');
    }

    if (x.value.password === x.value.cpass) {
      var password = x.value.password;
    } else {
      this.toastr.errorToastr('incorrect password match');
    }

    if (x.value.email.match(emailRe) && x.value.username.match(nameRe)) {
      let comingUser = [
        x.value.fullname,
        x.value.username,
        x.value.email,
        password,
      ];
      let err = ['fullname', 'username', 'email', 'password'];
      let p = 0;
      let count = 0;

      while (p < comingUser.length) {
        if (comingUser[p].length < 2) {
          this.toastr.errorToastr(err[p] + 'should be more than two letters');
          break;
        } else {
          count++;
        }
        p++;
      }

      if (count == comingUser.length) {
        if (!this.order) {
          let msg = {
            fullname: x.value.fullname,
            username: x.value.username,
            email: x.value.email,
            password: password,
            bitcoin: x.value.bitcoin,
            key: 'reg',
          };
          this.toastr.successToastr('Creating Account');
          this.server.Api(msg).subscribe(
            (res) => {
              if (res['code'] == '1') {
                this.toastr.successToastr('Account created successfully');
                if (this.login.push('me')) {
                  this.route.navigate(['login']);
                }
              } else {
                this.toastr.warningToastr('Server error');
              }
            },
            () => {},
            () => {}
          );
        } else {
          let msg = {
            fullname: x.value.fullname,
            username: x.value.username,
            email: x.value.email,
            password: password,
            bitcoin: x.value.bitcoin,
            ref: this.order,
            key: 'regref',
          };
          this.toastr.successToastr('Creating Account');
          this.server.Api(msg).subscribe(
            (res) => {
              if (res['code'] == '1') {
                this.toastr.successToastr('Account created successfully');
                if (this.login.push('me')) {
                  this.route.navigate(['login']);
                }
              } else {
                this.toastr.warningToastr('Server error');
              }
            },
            () => {},
            () => {}
          );
        }
      }
    }
  }

  tog() {
    $('#met').toggleClass('show');
  }
}
