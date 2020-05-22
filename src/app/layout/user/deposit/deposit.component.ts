import {
  Inject,
  Renderer2,
  Component,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DataService } from '../../../data.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';

declare let $;
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  currentUrl: string;
  acc: any;
  plan: any;
  users: any;
  profit: any;
  Id: any;
  amount: any;
  term: any;
  paymethod: any;
  ammethod: any;
  percent: any;
  netprofit: any;
  med = new FormData();
  amountTopay: any;
  addressTopay: any;
  pucg: number;
  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private server: DataService,
    private cookieService: CookieService,
    public toastr: ToastrManager,
    private chRef: ChangeDetectorRef,
    public session: SessionStorageService,
    private route: Router,
    private activate: ActivatedRoute,
    vcr: ViewContainerRef
  ) {
    route.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));
  }

  ngOnInit() {
    $('meta[name=viewport]').attr(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    );
    this.Id = this.session.get('sessionID');
    let data = this.activate.snapshot.data;
    this.acc = data['news'].dep['message'][0]['mainaccountbal'];
    this.users = data['news'].dep['message'][0]['username'];
  }

  calculate(x: NgForm) {
    console.log(x.value);
    console.log(x.value);
    let options = parseInt(x.value.options);
    let Deposit = parseInt(x.value.deposit);
    let spendFrom = x.value.spend;

    if (options == 1) {
      this.term = 1;
      if (Deposit >= 100 && Deposit <= 5000) {
        if (Deposit >= 100 && Deposit <= 900) {
          this.profit = Math.floor(Deposit * 1.1);
          this.percent = 1.1;

          $('#pan').click();
        }
        if (Deposit > 900 && Deposit <= 5000) {
          this.profit = Math.floor(Deposit * 1.25);
          this.percent = 1.25;
        }
      } else {
        Deposit = 100;
        this.profit = Math.floor(Deposit * 1.1);
        this.percent = 1.1;
      }
    }

    if (options == 2) {
      this.term = 3;
      if (Deposit >= 30 && Deposit <= 10000) {
        if (Deposit >= 30 && Deposit <= 1000) {
          this.profit = Math.floor(Deposit * 1.15);
          this.percent = 1.15;
        }

        if (Deposit > 1000 && Deposit <= 10000) {
          this.profit = Math.floor(Deposit * 1.3);
          this.percent = 1.3;
        }
      } else {
        Deposit = 30;
        this.profit = Math.floor(Deposit * 1.15);
        this.percent = 1.15;
      }
    }
    if (options == 3) {
      this.term = 3;
      if (Deposit >= 11000) {
        this.profit = Math.floor(Deposit * 1.5);
        this.percent = 1.5;
      } else {
        Deposit = 11000;
        this.profit = Math.floor(Deposit * 1.5);
        this.percent = 1.5;
      }
    }

    this.netprofit = this.profit - Deposit;
    this.ammethod = Deposit;
    this.plan = options;
    this.paymethod = spendFrom;

    $('#pan').click();
  }

  Deposit() {
    if (
      this.paymethod == 'Bitcoin' &&
      this.netprofit &&
      this.ammethod &&
      this.plan
    ) {
      /*  this.med.append("user_id", this.Id);
      this.med.append("plan", this.plan);
      this.med.append("profit", this.profit);
      this.med.append("amount", this.ammethod);
      this.med.append("username", this.users);
      this.med.append("percent", this.percent);
      this.med.append("key", "depo");
      console.log(this.med);
 */
      let med = {
        user_id: this.Id,
        plan: this.plan,
        profit: this.profit,
        amount: this.ammethod,
        username: this.users,
        percent: this.percent,
        key: 'depoBitcoin',
      };
      this.server.Api(med).subscribe(
        (res) => {
          if (res['code'] == 1) {
            this.amountTopay = res['amount_btc'];
            this.addressTopay = res['address'];

            $('#mod').click();
            // this.show = 2;
            // $("#btn").click();
          }

          if (res == 2) {
            this.toastr.warningToastr(
              'You have an active deposit',
              'Security center',
              { animate: 'fade' }
            );
          }
        },
        () => {},
        () => {}
      );
    } else if (
      this.paymethod == 'Account' &&
      this.netprofit &&
      this.ammethod &&
      this.plan
    ) {
      let payload = {
        plan: this.plan,
        username: this.users,
        profit: this.profit,
        amount: this.ammethod,
        val: this.Id,
        percent: this.percent,
        key: 'depo',
      };
      this.server.Api(payload).subscribe((res) => {
        if (res['code'] == 1) {
          this.toastr.successToastr('Your Deposit is Accepted', null, {
            animate: 'fade',
          });
        }

        if (res['code'] == 2) {
          this.toastr.warningToastr(
            'You have insufficent funds in your wallet for this plan',
            null,
            { animate: 'fade' }
          );
        }

        if (res['code'] == 3) {
          this.toastr.errorToastr(
            'Deposit not accepted, you have an active deposite',
            null,
            { animate: 'fade' }
          );
        }
      });
    } else {
      this.toastr.errorToastr('Incomplete data', 'Security Center');
    }
  }

  copy() {
    /* Get the text field */
    console.log('me');
    var copyText = $('#refUr');
    /* Select the text field */
    copyText.select();
    // copyText.setSelectionRange(0, 99999); /*For mobi
    /* Copy the text inside the text field */
    document.execCommand('copy');
    this.toastr.successToastr('Link copied');
  }
}
