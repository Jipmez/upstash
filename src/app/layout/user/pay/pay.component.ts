import {
  Component,
  OnInit,
  Renderer2,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SessionStorageService } from 'angular-web-storage';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from '../../../data.service';
import { DOCUMENT } from '@angular/common';
declare let $;
@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
})
export class PayComponent implements OnInit {
  currentUrl: string;
  Id: any;
  med = new FormData();
  fund: any;
  url: any;
  ref: string;
  val: string | number;
  payam: any;
  destination: any;

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private server: DataService,
    private cookieService: CookieService,
    public toastr: ToastrManager,
    private chRef: ChangeDetectorRef,
    public session: SessionStorageService,
    private route: Router
  ) {
    route.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));

    this.Id = this.session.get('sessionID');
  }

  ngOnInit() {
    this.ref = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }

  fundWith(x: NgForm) {
    this.fund = 'crypto';
    if (this.fund == 'crypto') {
      this.med.append('user_id', this.Id);
      this.med.append('amount', x.value.amount);
      this.med.append('fundwith', this.fund);
      this.med.append('key', 'crypto');

      this.server.Pay(this.med).subscribe((res) => {
        console.log(res);

        this.url = res['url'];
        console.log(this.url);
        // $("#me").click();

        // window.location.href = this.url;

        window.open(this.url, '_blank');

        this.route.navigate(['/dashboard']);
      });
    }
  }

  /*   pay(x: NgForm) {
    if (this.fund == 'crypto') {
      this.med.append('user_id', this.Id);
      this.med.append('amount', x.value.amount);
      this.med.append('fundwith', this.fund);
      this.med.append('key', 'crypto');

      this.server.Pay(this.med).subscribe((res) => {
        console.log(res);

        this.url = res['url'];
        console.log(this.url);
       

        window.open(this.url, '_blank');

        this.route.navigate(['/dashboard']);
      });
    } else {

      let pay = {
        amount: x.value.amount,
        fundwith: this.fund,
        user_id: this.Id,
        key: 'paystack',
      };

      this.server.Api(pay).subscribe((res) => {});
    }
  } */

  paymentDone(res) {
    if (res.status == 'success') {
      let pay = {
        amount: this.payam,
        user_id: this.Id,
        txref: res.trxref,
        paid: this.val,
        destination: this.destination,
        payed_from: 'dashboard',
        transaction: res.transaction,
        key: 'paystack',
      };

      this.server.Api(pay).subscribe((res) => {
        if (res['code'] == 1) {
          this.route.navigate(['/dashboard']);
        }
      });
    }
  }

  generateReference(): string {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 20; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentCancel() {
    console.log('payment failed');
  }

  vall(x: NgForm) {
    this.payam = x.value.amount;
    let transac = x.value.amount * 0.02 * 100 * 366;
    this.val = x.value.amount * 100 * 366 + transac;
  }

  des(x: NgForm) {
    this.destination = x.value.destination;
    console.log(this.destination);
  }
}
