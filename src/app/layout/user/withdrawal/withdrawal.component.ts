import { Component, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DataService } from '../../../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { ToastrManager } from 'ng6-toastr-notifications';

declare let $;
@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss'],
})
export class WithdrawalComponent implements OnInit {
  pwith: any;
  bitad: any;
  constructor(
    private server: DataService,
    private cookieService: CookieService,
    private route: Router,
    private activate: ActivatedRoute,
    private toastr: ToastrManager,
    public session: SessionStorageService
  ) {}

  cookieValue = this.cookieService.get('logID');
  acc;

  /*  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!');
  } */

  ngOnInit() {
    $('meta[name=viewport]').attr(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    );
    this.cookieValue = this.session.get('sessionID');
    let data = this.activate.snapshot.data;
    this.acc = data['news'].dep['message'][0]['mainaccountbal'];
    this.bitad = data['news'].dep['message'][0]['bitcoinaddress'];
    this.pwith = data['news'].dep['pwith'];
  }

  withdraw(x: NgForm) {
    let amount = parseInt(x.value.withdraw);
    if (this.bitad == '') {
      this.toastr.warningToastr(
        'Please update your bitcoin address in profile to continue',
        null,
        { animate: 'fade' }
      );
    } else {
      if (amount >= 5) {
        if (amount <= this.acc) {
          let me = {
            withdraw: amount,
            val: this.cookieValue,
            key: 'withdraw',
          };
          this.server.Api(me).subscribe(
            (res) => {
              if (res['code'] == 1) {
                this.toastr.successToastr(res['message'], 'Security Center');

                this.route.navigate(['/dashboard/dashcontent']);
              }
              if (res['code'] == 2) {
                this.toastr.warningToastr(res['message'], 'Security Center');
              }
            },
            () => {},
            () => {}
          );
        } else {
          this.toastr.errorToastr(
            'You cant withdraw anything more than' + '$' + '' + '' + this.acc,
            null,
            { animate: 'fade' }
          );
        }
      } else {
        this.toastr.warningToastr(
          'You cant withdraw anything less than $1000',
          null,
          { animate: 'fade' }
        );
      }
    }
  }
}
