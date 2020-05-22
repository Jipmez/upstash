import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ng6-toastr-notifications";
import { FormsModule } from "@angular/forms";
//import { LocalStorage } from "@ngx-pwa/local-storage";
import { ParticlesModule } from "angular-particle";
import { AngularWebStorageModule } from "angular-web-storage";

/* import { DashboardComponent } from "../user/dashboard/dashboard.component";
import { DashcontentComponent } from "../user/dashcontent/dashcontent.component";
import { DashcontentserviceService } from "../user/dashcontent/dashcontentservice.service";
import { ReferralService } from "../user/referral/referral.service";
import { DetailService } from "../user/detail/detail.service";
import { DashboardserviceService } from "../user/dashboard/dashboardservice.service";
import { DepositComponent } from "../user/deposit/deposit.component";
import { WithdrawalComponent } from "../user/withdrawal/withdrawal.component";
import { DetailComponent } from "../user/detail/detail.component";
import { ReferralComponent } from "../user/referral/referral.component";
import { ProfileComponent } from "../user/profile/profile.component";
import { DepositlistComponent } from "../user/depositlist/depositlist.component";
import { UserRoutingModule } from "./user-routing.module"; */

@NgModule({
  declarations: [
    /*  DashboardComponent,
    DashcontentComponent,
    DepositComponent,
    WithdrawalComponent,
    DetailComponent,
    ReferralComponent,
    ProfileComponent,
    DepositlistComponent */
  ],
  imports: [
    CommonModule,
    /*  UserRoutingModule, */
    CommonModule,
    ToastrModule.forRoot(),
    ParticlesModule,
    //  LocalStorage,
    HttpClientModule,
    AngularWebStorageModule,
    FormsModule,
  ],
  providers: [
    /*  DashcontentserviceService,
    DashboardserviceService,
    ReferralService,
    DetailService */
  ],
})
export class UserModule {}
