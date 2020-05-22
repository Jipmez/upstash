import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { FormsModule } from '@angular/forms';
//import { LocalStorage } from "@ngx-pwa/local-storage";
/* import { ParticlesModule } from 'angular-particle'; */
import { AngularWebStorageModule } from 'angular-web-storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContactComponent } from './layout/start/contact/contact.component';
import { DashboardComponent } from './layout/user/dashboard/dashboard.component';
import { DashcontentComponent } from './layout/user/dashcontent/dashcontent.component';
import { DashcontentserviceService } from './layout/user/dashcontent/dashcontentservice.service';
import { ReferralService } from './layout/user/referral/referral.service';
import { DetailService } from './layout/user/detail/detail.service';
import { DashboardserviceService } from './layout/user/dashboard/dashboardservice.service';
import { DepositComponent } from './layout/user/deposit/deposit.component';
import { WithdrawalComponent } from './layout/user/withdrawal/withdrawal.component';
import { DetailComponent } from './layout/user/detail/detail.component';
import { ReferralComponent } from './layout/user/referral/referral.component';
import { ProfileComponent } from './layout/user/profile/profile.component';
import { DepositlistComponent } from './layout/user/depositlist/depositlist.component';
import { CryptoComponent } from './layout/user/crypto/crypto.component';
import { InvestmentComponent } from './layout/user/investment/investment.component';

import { Angular4PaystackModule } from 'angular4-paystack';
import { ExploreComponent } from './layout/user/explore/explore.component';
import { CompleteComponent } from './layout/user/complete/complete.component';
import { FixedComponent } from './layout/user/fixed/fixed.component';
import { AinvestComponent } from './layout/user/ainvest/ainvest.component';
import { AssetssComponent } from './layout/user/assetss/assetss.component';
import { PayComponent } from './layout/user/pay/pay.component';
import { InDetailComponent } from './layout/user/in-detail/in-detail.component';
import { RechargeComponent } from './layout/user/recharge/recharge.component';
import { WalletrxComponent } from './layout/user/walletrx/walletrx.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashcontentComponent,
    DepositComponent,
    WithdrawalComponent,
    DetailComponent,
    ReferralComponent,
    ProfileComponent,
    DepositlistComponent,
    CryptoComponent,
    InvestmentComponent,
    ExploreComponent,
    CompleteComponent,
    FixedComponent,
    AinvestComponent,
    AssetssComponent,
    PayComponent,
    InDetailComponent,
    RechargeComponent,
    WalletrxComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    /*   ParticlesModule, */
    //  LocalStorage,
    HttpClientModule,
    AngularWebStorageModule,
    Angular4PaystackModule.forRoot(
      'pk_test_1c8ffc3fc5b6558d3a5a34fb3af6e3ed854fb57c'
    ),
    FormsModule,
  ],
  providers: [
    CookieService,
    DashcontentserviceService,
    DashboardserviceService,
    ReferralService,
    DetailService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
