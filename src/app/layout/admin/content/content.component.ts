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
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.scss"],
})
export class ContentComponent implements OnInit {
  @ViewChild("dataTable") table: ElementRef;
  dataTable: any;
  currentUrl: string;
  dep = [];
  q: number;

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
    $("meta[name=viewport]").attr(
      "content",
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    );

    let data = this.activate.snapshot.data;

    this.dep = data["content"].users["message"];
    console.log(this.dep);
    this.chRef.detectChanges();
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable({
      responsive: true,
    });
  }

  select(deposits) {
    console.log("me");
    this.route.navigate([
      "hkgjiinif684080ngi98084g06/proid",
      deposits.profileId,
    ]);
  }

  simDep(x: NgForm) {
    console.log(x.value.username, x.value.amount);

    let simDep = {
      username: x.value.username,
      amount: x.value.amount,
      key: "simdep",
    };

    this.server.Api(simDep).subscribe(
      (res) => {
        console.log(res);
        this.toastr.successToastr(res["message"], "Security center");
      },
      () => {},
      () => {}
    );
  }

  simWith(x: NgForm) {
    console.log(x.value.username, x.value.amount);

    let simWith = {
      username: x.value.username,
      amount: x.value.amount,
      key: "simwith",
    };

    this.server.Api(simWith).subscribe(
      (res) => {
        this.toastr.successToastr(res["message"], "Security center");
      },
      () => {},
      () => {}
    );
  }
}
