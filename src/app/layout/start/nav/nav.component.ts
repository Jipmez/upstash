import {
  Component,
  OnInit,
  ViewContainerRef,
  Renderer2,
  Inject,
} from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { NgForm } from "@angular/forms";
import { DOCUMENT } from "@angular/common";
import { DataService } from "../../../data.service";
import { Router } from "@angular/router";
import { SessionStorageService } from "angular-web-storage";
declare let $;

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  constructor(
    private server: DataService,
    private cookieService: CookieService,
    private route: Router,
    public session: SessionStorageService,
    private _renderer2: Renderer2,
    public cookie: CookieService,
    @Inject(DOCUMENT) private _document: Document
  ) {
    // $("meta[name=viewport]").attr("content", "width=device-width");
  }
  ngOnInit() {}

  logIn(x: NgForm) {
    var emailRe = /^.+@.+\..{2,4}$/;

    if (x.value.email.match(emailRe)) {
      let comingUser = [x.value.email, x.value.password];

      let err = ["email", "wiwoo"];

      let p = 0;
      let count = 0;

      while (p < comingUser.length) {
        if (comingUser[p].length < 4) {
          // this.toastr.warning(err[p] + "is empty");
          break;
        } else {
          count++;
        }
        p++;
      }

      if (count == comingUser.length) {
        let logInfo = {
          email: x.value.email,
          password: x.value.password,
          key: "log",
        };
        //this.ngProgress.start();
        this.server.Api(logInfo).subscribe(
          (res) => {
            if (res["code"] == 1) {
              // this.toastr.success(res["message"], "Security center");
              let bag = res["token"];

              this.session.set("sessionID", bag);
              $("#close").click();

              this.route.navigate(["dashboard"]);
            }

            if (res["code"] == 2) {
              //  this.toastr.success(res["message"], "Security center");
              let bag = res["token"];
              this.session.set("adminID", bag);
              $("#close").click();
              this.route.navigate(["hkgjiinif684080ngi98084g06"]);
            }

            if (res["code"] == 3) {
              //  this.toastr.warning(res["message"], "Security center");
            } else {
              //   this.toastr.warning(res["message"], "Security center");
            }
            //    this.ngProgress.done();
          },
          () => {},
          () => {}
        );
      }
    } else {
    }
  }

  tog(e) {
    $(".main-menu").slideToggle(400);
  }
}
