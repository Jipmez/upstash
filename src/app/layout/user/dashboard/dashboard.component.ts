import { Component, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { DataService } from '../../../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {
  LocalStorageService,
  SessionStorageService,
  LocalStorage,
  SessionStorage,
} from 'angular-web-storage';

declare var $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentUrl: string;
  cookieValue: string;
  sidebarVisible: boolean;
  user: any;
  payed: any;

  constructor(
    private server: DataService,
    vcr: ViewContainerRef,
    private cookieService: CookieService,
    public session: SessionStorageService,
    private activate: ActivatedRoute,
    private route: Router
  ) {
    route.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));
    this.sidebarVisible = true;
  }

  ngOnInit() {
    this.cookieValue = this.session.get('sessionID');

    let data = this.activate.snapshot.data;
    this.user = data['news'].dep['message'][0]['fullname'];
    this.payed = data['news'].dep['message'][0]['payed'];
    if (this.payed == '0') {
      this.route.navigate(['/memberaccess']);
    }
  }

  toggleme() {
    if (window.innerWidth > 920) {
      if (this.sidebarVisible === true) {
        this.sidebarCloseLap();
        this.sidebarVisible = false;
      } else {
        this.sidebarOpenLap();
        this.sidebarVisible = true;
      }
    }

    if (window.innerWidth <= 920) {
      if (this.sidebarVisible === true) {
        this.sidebarCloseMob();
        this.sidebarVisible = false;
      } else {
        this.sidebarOpenMob();
        this.sidebarVisible = true;
      }
    }
  }

  sidebarCloseLap() {
    $('.sidenav').css('margin-left', '-260px');
    $('.main-content').css('margin-left', '0px');
    $('.our-nav').css('margin-left', '0px');
  }
  sidebarOpenLap() {
    $('.sidenav').css('margin-left', '0px');
    $('.main-content').css('margin-left', '19.5%');
    $('.our-nav').css('margin-left', '19.5%');
  }

  sidebarCloseMob() {
    $('.sidenav').css('margin-left', '-70px');
    $('.main-content').css({ 'margin-left': '0px', width: '100%' });
    $('.our-nav').css('margin-left', '0px');
  }

  sidebarOpenMob() {
    $('.sidenav').css('margin-left', '0');
    $('.main-content').css({ 'margin-left': '73px', width: '80.5%' });
    $('.our-nav').css('margin-left', '73px');
  }

  logOut() {
    this.server.logOut();
  }
}
