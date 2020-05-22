import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DataService } from '../../../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
declare let $;
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  @ViewChild('dataTable') table: ElementRef;
  dataTable: any;

  deposit;
  q: number;
  constructor(
    private server: DataService,
    private chRef: ChangeDetectorRef,
    private cookieService: CookieService,
    private route: Router,
    private activate: ActivatedRoute,
    private toastr: ToastrManager,
    vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    let data = this.activate.snapshot.data;
    this.deposit = data['depconfirm']['deposits'];
    this.chRef.detectChanges();
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable({
      responsive: true,
    });
  }

  select(deposits) {
    console.log('me');
    this.route.navigate([
      'hkgjiinif684080ngi98084g06/proid',
      deposits.profileId,
    ]);
  }

  confirm(x) {
    const payload = {
      depositId: x,
      key: 'depositId',
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
