import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { DataService } from '../../../data.service';

declare let $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  deposit = [];
  withdraw = [];
  dep: any;
  with: any;
  user: any;
  constructor(
    private server: DataService,
    private _renderer2: Renderer2,
    public cookie: CookieService,
    @Inject(DOCUMENT) private _document: Document
  ) {
    // $("meta[name=viewport]").attr("content", "width=1100");
  }

  ngOnInit() {
    this.server.render(
      this._renderer2,
      'https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=en&widgetTheme=light&autoMode=false'
    );

    this.myStyle = {
      position: 'relative',
      width: '100%',
      height: '100%',
      /*  "z-index": 1, */
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };

    this.myParams = {
      particles: {
        number: {
          value: 150,
        },
        color: {
          value: '#FFD400',
        },
        shape: {
          type: 'edge',
        },
      },
    };

    let user = {
      key: 'invest',
    };
    this.server.Api(user).subscribe(
      (res) => {
        console.log(res);
        if ((res['code'] = 1)) {
          this.deposit = res['message'][0];
          this.withdraw = res['message'][1];
          this.dep = res['dep'];
          this.with = res['with'];
          this.user = res['user'];
        }
      },
      () => {},
      () => {}
    );
  }

  ngAfterViewInit() {
    const s = this._renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    let me = {
      symbols: [
        {
          proName: 'OANDA:SPX500USD',
          title: 'S&P 500',
        },
        {
          proName: 'OANDA:NAS100USD',
          title: 'Nasdaq 100',
        },
        {
          proName: 'FX_IDC:EURUSD',
          title: 'EUR/USD',
        },
        {
          proName: 'BITSTAMP:BTCUSD',
          title: 'BTC/USD',
        },
        {
          proName: 'BITSTAMP:ETHUSD',
          title: 'ETH/USD',
        },
      ],
      colorTheme: 'light',
      isTransparent: false,
      displayMode: 'adaptive',
      locale: 'en',
    };
    this._renderer2.appendChild(this._document.getElementById('sage'), s);
  }
}
