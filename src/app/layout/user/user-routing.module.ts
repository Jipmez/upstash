import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "../user/dashboard/dashboard.component";
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
import { CryptoComponent } from "./crypto/crypto.component";
import { InvestmentComponent } from "./investment/investment.component";

const routes: Routes = [
  // { path: "dashboard", redirectTo: "morr", pathMatch: "full" },

  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "scs",
        component: DashcontentComponent,
        resolve: {
          news: DashcontentserviceService,
        },
      },
      {
        path: "dashcontent",
        component: DashcontentComponent,
        resolve: {
          news: DashcontentserviceService,
        },
      },
      {
        path: "deposit",
        component: DepositComponent,
        children: [
          {
            path: "",
            component: InvestmentComponent,
          },
          {
            path: "crypto",
            component: CryptoComponent,
          },
        ],
      },
      {
        path: "withdrawal",
        component: WithdrawalComponent,
        resolve: {
          news: DashcontentserviceService,
        },
      },
      {
        path: "details/:id",
        component: DetailComponent,
      },
      {
        path: "affiliate",
        component: ReferralComponent,
        resolve: {
          ref: ReferralService,
        },
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "depoH",
        component: DepositlistComponent,
      },
    ],
    resolve: {
      news: DashboardserviceService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
