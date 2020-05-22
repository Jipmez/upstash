import {
  Component,
  OnInit,
  ViewContainerRef,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DataService } from '../../../data.service';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrManager } from 'ng6-toastr-notifications';

declare let $;
@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss'],
})
export class WithdrawalComponent implements OnInit {
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;

  constructor(
    private server: DataService,
    private chRef: ChangeDetectorRef,
    private cookieService: CookieService,
    private route: Router,
    private activate: ActivatedRoute,
    private toastr: ToastrManager,
    vcr: ViewContainerRef
  ) {
    $('#tog').click();
  }
  withdraw;
  q: number;
  ngOnInit() {
    let data = this.activate.snapshot.data;
    this.withdraw = data['withconfirm']['withdrawals'];
    this.chRef.detectChanges();
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable({
      responsive: true,
    });
  }

  select(deposits) {
    this.route.navigate([
      'hkgjiinif684080ngi98084g06/proid',
      deposits.profileid,
    ]);
  }

  confirm(x) {
    console.log(x);

    let payload = {
      withdrawId: x,
      key: 'withdrawId',
    };

    this.server.Api(payload).subscribe(
      (res) => {
        console.log(res);
      },
      () => {},
      () => {}
    );
  }
}
