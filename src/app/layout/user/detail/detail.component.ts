import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';

declare let $;
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  cookieValue: any;
  id: string;
  invest = [];
  constructor(
    public session: SessionStorageService,
    private server: DataService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastrManager
  ) {
    $('#tog').click();
  }

  ngOnInit() {
    $('meta[name=viewport]').attr(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    );

    this.cookieValue = this.session.get('sessionID');
    this.id = this.route.snapshot.paramMap.get('id');

    let load = {
      val: this.cookieValue,
      inv: this.id,
      key: 'inv',
    };

    this.server.Api(load).subscribe((res) => {
      this.invest = res['messsage'];

      // this.profit = this.invest[0]['current']
      console.log(this.invest);
    });
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
        /* 
        this.router
          .navigateByUrl("dashboard", { skipLocationChange: true })
          .then(() => this.router.navigate(["/dashboard/dashcontent"])); */
      }
    });
  }
}
