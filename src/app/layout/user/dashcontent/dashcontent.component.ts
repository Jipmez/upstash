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

declare var $;
declare const TradingView: any;

@Component({
  selector: 'app-dashcontent',
  templateUrl: './dashcontent.component.html',
  styleUrls: ['./dashcontent.component.scss'],
})
export class DashcontentComponent implements OnInit {
  currentUrl: string;
  username: any;
  totprof: any;
  total: any;
  monthpro: any;
  sta: boolean;
  ref: string;
  title: any;
  val: any;
  naira: any;

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
  stat: any;
  dep = [];
  acc;
  earn;
  earnn;
  pwith;
  lastwith;
  totwith;
  totdep;
  lastdep;
  Chart;
  per;
  cookieValue = this.session.get('sessionID');
  /* 
  ngAfterViewInit() {
    //   new TradingView.widget({
    //      'container_id': 'technical-analysis',
    //      'autosize': true,
    //      'symbol': "NASDAQ:AAPL",
    //      'interval': '120',
    //      'timezone': 'exchange',
    //      'theme': 'Dark',
    //      'style': '1',
    //      'toolbar_bg': '#f1f3f6',
    //      'withdateranges': true,
    //      'hide_side_toolbar': false,
    //      'allow_symbol_change': true,
    //      'save_image': false,
    //      'hideideas': true,
    //      'studies': [
    //      'MASimple@tv-basicstudies' ],
    //      'show_popup_button': true,
    //      'popup_width': '1000',
    //      'popup_height': '650'
    //    });

    const s = this._renderer2.createElement("script");
    s.type = "text/javascript";
    const t = new TradingView.widget({
      autosize: true,
      symbol: "COINBASE:BTCUSD",
      interval: "120",
      timezone: "exchange",
      theme: "light",
      style: "3",
      toolbar_bg: "#f1f3f6",
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      save_image: false,
      hideideas: true,
      studies: ["MASimple@tv-basicstudies"],
      show_popup_button: true,
      popup_width: "1000",
      popup_height: "650",
      container_id: "tradingview_c7dc2"
    });
    this._renderer2.appendChild(this._document.body, s);
  } */
  ngOnInit() {
    this.ref = `ref-${Math.ceil(Math.random() * 10e13)}`;

    let data = this.activate.snapshot.data;
    this.dep = data['news'].types['message'];
    this.username = data['news'].dep['message'][0]['username'];
    this.earn = data['news'].dep['message'][0]['earning'];
    this.acc = data['news'].dep['message'][0]['mainaccountbal'];
    this.naira = data['news'].dep['message'][0]['naira_balance'];
    this.stat = data['news'].dep['message'][0]['status'];
    this.pwith = data['news'].dep['pwith'];
    this.lastwith = data['news'].dep['lastwith'];
    this.totwith = data['news'].dep['totwith'];
    this.totdep = data['news'].dep['totdep'];
    this.totprof = data['news'].dep['totpro'];
    this.lastdep = data['news'].dep['lastdep'];
    this.monthpro = data['news'].dep['monthpro'];
    this.total = data['news'].dep['add'];
  }

  redirectTo(uri) {
    this.route
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.route.navigate([uri]));
  }

  cashout(x) {
    let v = document.getElementById(x);

    $(v).attr('disabled', true);
    let out = {
      depID: x,
      token: this.cookieValue,
      key: 'cashout',
    };

    this.server.Api(out).subscribe((res) => {
      if (res) {
        this.toastr.successToastr('Security center', res['message']);

        let v = document.getElementById(x);
        $(v).remove();
        /* 
        this.route
          .navigateByUrl("dashboard", { skipLocationChange: true })
          .then(() => this.route.navigate(["/dashboard/dashcontent"])); */
      }
    });
  }

  me(res) {
    console.log(res);
    if (res.status == 'success') {
      alert('success');
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

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    console.log(this.title, ref);
  }

  paymentCancel() {
    console.log('payment failed');
  }
}
