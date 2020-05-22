import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { InvestmentComponent } from './layout/user/investment/investment.component';
import { CryptoComponent } from './layout/user/crypto/crypto.component';
import { ExploreComponent } from './layout/user/explore/explore.component';
import { CompleteComponent } from './layout/user/complete/complete.component';
import { FixedComponent } from './layout/user/fixed/fixed.component';
import { AinvestComponent } from './layout/user/ainvest/ainvest.component';
import { AssetssComponent } from './layout/user/assetss/assetss.component';
import { PayComponent } from './layout/user/pay/pay.component';
import { InDetailComponent } from './layout/user/in-detail/in-detail.component';
import { RechargeComponent } from './layout/user/recharge/recharge.component';
import { WalletrxComponent } from './layout/user/walletrx/walletrx.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layout/start/start.module').then((m) => m.StartModule),
  },
  // { path: "dashboard", loadChildren: "./layout/user/user.module#UserModule" },
  {
    path: 'hkgjiinif684080ngi98084g06',
    loadChildren: () =>
      import('./layout/admin/admin.module').then((m) => m.AdminModule),
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashcontentComponent,
        resolve: {
          news: DashcontentserviceService,
        },
      },
      {
        path: 'dashcontent',
        component: DashcontentComponent,
        resolve: {
          news: DashcontentserviceService,
        },
      },
      {
        path: 'deposit',
        component: DepositComponent,
        children: [
          {
            path: '',
            component: ExploreComponent,
            children: [
              {
                path: '',
                component: AinvestComponent,
              },
              {
                path: 'fx',
                component: FixedComponent,
              },
              {
                path: 'cryp',
                component: CryptoComponent,
              },
              {
                path: 'assets',
                component: AssetssComponent,
              },
            ],
          },
          {
            path: 'Investment',
            component: DepositlistComponent,
          },
          {
            path: 'Complete',
            component: CompleteComponent,
          },
        ],
        resolve: {
          news: DashcontentserviceService,
        },
      },
      {
        path: 'indetail/:id',
        component: InDetailComponent,
      },
      {
        path: 'withdrawal',
        component: WithdrawalComponent,
        resolve: {
          news: DashcontentserviceService,
        },
      },
      {
        path: 'details/:id',
        component: DetailComponent,
      },
      {
        path: 'affiliate',
        component: ReferralComponent,
        resolve: {
          ref: ReferralService,
        },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        resolve: {
          news: DashboardserviceService,
        },
      },
      {
        path: 'pay',
        component: PayComponent,
      },
      {
        path: 'depoH',
        component: DepositlistComponent,
      },
      {
        path: 'recharge',
        component: RechargeComponent,
      },
      {
        path: 'walletrx',
        component: WalletrxComponent,
      },
    ],
    resolve: {
      news: DashboardserviceService,
    },
    canActivate: [AuthGuard],
  },

  /*  {
    path: "**",
    component: HomeComponent
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
