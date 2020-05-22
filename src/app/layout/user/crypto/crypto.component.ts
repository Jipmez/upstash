import {
  Component,
  OnInit,
  Renderer2,
  ChangeDetectorRef,
  ViewContainerRef,
  Inject,
} from '@angular/core';
import { DataService } from 'src/app/data.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SessionStorageService } from 'angular-web-storage';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
declare let $;
@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss'],
})
export class CryptoComponent implements OnInit {
  currentUrl: string;
  location: string;
  Id: any;
  data = [];

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
  }

  ngOnInit() {
    let get = {
      key: 'getAcrypto',
    };

    this.server.Api(get).subscribe((res) => {
      this.data = res['message'];
      console.log(this.data);
    });
  }
}
