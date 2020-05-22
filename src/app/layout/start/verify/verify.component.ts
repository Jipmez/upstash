import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
declare let $;
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  order: any;
  code: any;

  constructor(
    private route: ActivatedRoute,
    private server: DataService,
    private nav: Router
  ) {
    $('meta[name=viewport]').attr('content', 'width=1100');
  }

  ngOnInit() {
    this.route.queryParams
      .filter((params) => params.hash)
      .subscribe((params) => {
        console.log(params); // {order: "popular"}

        this.order = params.hash;
        console.log(this.order); // popular
      });

    if (this.order) {
      let confirm = {
        hash: this.order,
        key: 'mailconfirm',
      };
      this.server.Api(confirm).subscribe((res) => {
        this.code = res['code'];
      });
    } else {
      this.nav.navigate(['/']);
    }
  }
}
