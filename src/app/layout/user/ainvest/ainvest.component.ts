import {
  Inject,
  Renderer2,
  Component,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { CookieService } from "ngx-cookie-service";
import { NgForm } from "@angular/forms";
import { ToastrManager } from "ng6-toastr-notifications";
import { DataService } from "../../../data.service";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { SessionStorageService } from "angular-web-storage";
declare let $;
@Component({
  selector: "app-ainvest",
  templateUrl: "./ainvest.component.html",
  styleUrls: ["./ainvest.component.scss"],
})
export class AinvestComponent implements OnInit {
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
    this.Id = this.session.get("sessionID");
  }

  ngOnInit() {
    let get = {
      key: "getAinvest",
    };

    this.server.Api(get).subscribe((res) => {
      this.data = res["message"];
      console.log(this.data);
    });
  }
}
