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

import {
  LocalStorageService,
  SessionStorageService,
  SessionStorage,
} from 'angular-web-storage';

declare let $;
@Component({
  selector: 'app-depositlist',
  templateUrl: './depositlist.component.html',
  styleUrls: ['./depositlist.component.scss'],
})
export class DepositlistComponent implements OnInit {
  currentUrl: string;
  cookieValue: string;
  plan = [];
  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private server: DataService,
    private cookieService: CookieService,
    public session: SessionStorageService,
    public toastr: ToastrManager,
    private chRef: ChangeDetectorRef,
    private route: Router,
    private activate: ActivatedRoute,
    vcr: ViewContainerRef
  ) {
    route.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));
  }

  ngOnInit() {
    this.cookieValue = this.session.get('sessionID');

    $('meta[name=viewport]').attr(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    );

    let dep = {
      val: this.cookieValue,
      key: 'dep',
    };
    this.server.Api(dep).subscribe(
      (res) => {
        if (res['code'] == 1) {
          this.plan = res['plan'];
        }
      },
      () => {},
      () => {}
    );
  }
}
