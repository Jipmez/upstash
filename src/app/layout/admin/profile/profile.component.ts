import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/Forms";
import { ToastrManager } from "ng6-toastr-notifications";
import { NgForm } from "@angular/forms";
import { DataService } from "../../../data.service";
declare let $;

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  bank: any;
  acc: any;
  phone: any;
  ref: any;

  constructor(
    private route: ActivatedRoute,
    private server: DataService,
    public toastr: ToastrManager,
    private rout: Router
  ) {}

  username;
  fullname;
  accountbal;
  email;
  country;
  bitad;
  city;
  state;
  address;
  zip;
  logtime;
  created;
  status;
  id;
  ngOnInit() {
    $("meta[name=viewport]").attr(
      "content",
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    );

    this.id = this.route.snapshot.paramMap.get("id");

    let user = {
      proid: this.id,
      key: "proUser",
    };
    this.server.Api(user).subscribe(
      (res) => {
        console.log(res);
        if (res["code"] == 1) {
          this.username = res["message"][0]["username"];
          this.fullname = res["message"][0]["fullname"];
          this.accountbal = res["message"][0]["mainaccountbal"];
          this.email = res["message"][0]["email"];
          this.bitad = res["message"][0]["bitcoinaddress"];
          this.ref = res["message"][0]["referral"];
          this.country = res["message"][0]["country"];
          this.city = res["message"][0]["city"];
          this.state = res["message"][0]["state"];
          this.address = res["message"][0]["address"];
          this.zip = res["message"][0]["zip"];
          this.created = res["message"][0]["date_created"];
          this.logtime = res["message"][0]["last_login"];
          this.status = res["message"][0]["status"];
          this.bank = res["message"][0]["bank"];
          this.acc = res["message"][0]["accountnumber"];
          this.phone = res["message"][0]["phone"];
        }
      },
      () => {},
      () => {}
    );
  }

  block() {
    let block = {
      id: this.id,
      key: "block",
    };
    this.server.Api(block).subscribe(
      (res) => {
        this.toastr.successToastr(res["message"], "Security Center");
      },
      () => {},
      () => {}
    );
  }

  unblock() {
    let unblock = {
      id: this.id,
      key: "unblock",
    };
    this.server.Api(unblock).subscribe(
      (res) => {
        this.toastr.successToastr(res["message"], "Security Center");
      },
      () => {},
      () => {}
    );
  }

  WithConfirm() {
    let confirm = {
      email: this.email,
      key: "conwith",
    };
    this.server.Api(confirm).subscribe(
      (res) => {
        this.toastr.successToastr(res["message"], "Security Center");
      },
      () => {},
      () => {}
    );
  }

  DepConfirm() {
    let confirm = {
      email: this.email,
      key: "condep",
    };
    this.server.Api(confirm).subscribe(
      (res) => {
        this.toastr.successToastr(res["message"], "Security Center");
      },
      () => {},
      () => {}
    );
  }

  person(x: NgForm) {
    let person = {
      fullname: x.value.fullname == "" ? this.fullname : x.value.fullname,
      email: x.value.email == "" ? this.email : x.value.email,
      phone: x.value.phone == "" ? this.phone : x.value.phone,
      id: this.id,
      key: "upPerson",
    };
    this.server.Api(person).subscribe((res) => {
      this.toastr.successToastr(res["message"], "Security Center");
    });
    x.reset;
  }

  account(x: NgForm) {
    let person = {
      bitad: x.value.bitad == "" ? this.bitad : x.value.bitad,
      account: x.value.account,
      id: this.id,
      key: "upAccount",
    };

    this.server.Api(person).subscribe((res) => {
      this.toastr.successToastr(res["message"], "Security Center");

      x.reset;
    });
  }
}
