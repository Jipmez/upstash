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
  selector: 'app-in-detail',
  templateUrl: './in-detail.component.html',
  styleUrls: ['./in-detail.component.scss'],
})
export class InDetailComponent implements OnInit {
  currentUrl: string;
  location: string;
  Id: any;
  detailId: string;
  data = [];
  val: any;

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

    this.location = window.location.origin;
    this.Id = this.session.get('sessionID');

    this.detailId = this.activate.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    let detail = {
      detail: this.detailId,
      key: 'getdetailId',
    };
    this.server.Api(detail).subscribe((res) => {
      this.data = res['message'];
    });
  }

  cart(x: NgForm) {
    console.log(x.value);

    let payload = {
      plan: this.data[0]['name'],
      username: 'tika',
      profit:
        (this.data[0]['roi'] / 100 + 1) *
        (x.value.sponsorunit * this.data[0]['stock_price']),
      amount: x.value.sponsorunit * this.data[0]['stock_price'],
      val: this.Id,
      picture: this.data[0]['picture_url'],
      percent: this.data[0]['roi'] / 100 + 1,
      duration: this.data[0]['duration'],
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
  }

  hy() {
    var str = $('#hy').val();
    this.val = '$' + str * this.data[0]['stock_price'];
  }
}
