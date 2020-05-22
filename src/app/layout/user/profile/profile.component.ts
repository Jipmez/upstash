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

declare var $;
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  currentUrl: string;
  username: any;
  fullname: any;
  email: any;
  log: any;
  sign: any;
  location: string;
  bitad: any;
  Id: any;
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
    $("meta[name=viewport]").attr(
      "content",
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    );

    let data = this.activate.snapshot.data;
    this.username = data["news"].dep["message"][0]["username"];
    this.fullname = data["news"].dep["message"][0]["fullname"];
    this.email = data["news"].dep["message"][0]["email"];
    this.log = data["news"].dep["message"][0]["last_login"];
    this.sign = data["news"].dep["message"][0]["date_created"];
    this.bitad = data["news"].dep["message"][0]["bitcoinaddress"]
      ? data["news"].dep["message"][0]["bitcoinaddress"]
      : "Not set";
  }

  update(x: NgForm) {
    console.log(x.value);

    let payload = {
      bitcoinaddress: x.value.bitad == "" ? this.bitad : x.value.bitad,
      password: x.value.cpass,
      newpass: x.value.newpass,
      Id: this.Id,
      key: "proUp",
    };

    this.server.Api(payload).subscribe(
      (res) => {
        console.log(res);
        if (res["code"] == 1) {
          this.toastr.successToastr(
            "Your profile has been updated succesfully",
            null,
            { animate: "fade" }
          );
        }
        if (res["code"] == 2) {
          this.toastr.warningToastr("please provide a correct password", null, {
            animate: "fade",
          });
        }
      },
      () => {},
      () => {}
    );
  }
}
