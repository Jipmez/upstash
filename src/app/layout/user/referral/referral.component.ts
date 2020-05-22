import {
  Inject,
  Renderer2,
  Component,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DataService } from '../../../data.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

declare let $;
@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss'],
})
export class ReferralComponent implements OnInit {
  currentUrl: string;
  refuser: string;
  refloc: string;
  refdate: string;
  num: any;
  sum: any;
  username: any;
  location: string;

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private server: DataService,
    private cookieService: CookieService,
    public toastr: ToastrManager,
    private chRef: ChangeDetectorRef,
    private route: Router,
    private activate: ActivatedRoute,
    vcr: ViewContainerRef
  ) {
    route.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));
  }

  ngOnInit() {
    $('meta[name=viewport]').attr(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    );
    this.location = window.location.origin;
    let data = this.activate.snapshot.data;
    console.log(data);
    if (data['ref'].types['refid'] == 0 || null || '') {
      this.refuser = 'None';
      this.refloc = 'None';
      this.refdate = 'None';
    } else {
      this.refuser = data['ref'].types['refid'][0]['username'];
      this.refloc = data['ref'].types['refid'][0]['country'];
      this.refdate = data['ref'].types['refid'][0]['date_created'];
    }

    this.num = data['ref'].types['refNum'];
    this.sum = data['ref'].types['refSum'];
    this.username = data['ref'].types['username'];
  }

  copy() {
    /* Get the text field */
    console.log('me');
    var copyText = $('#refUrl');
    /* Select the text field */
    copyText.select();
    // copyText.setSelectionRange(0, 99999); /*For mobi
    /* Copy the text inside the text field */
    document.execCommand('copy');
    this.toastr.successToastr('Link copied');
  }
}
