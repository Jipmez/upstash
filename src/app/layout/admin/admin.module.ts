import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { FormsModule } from '@angular/forms';
import { AngularWebStorageModule } from 'angular-web-storage';
import { AdmindashComponent } from './admindash/admindash.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ContentComponent } from './content/content.component';
import { ContentService } from './content/content.service';
import { ProfileComponent } from './profile/profile.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { DepositService } from './deposit/deposit.service';
import { WithdrawalService } from './withdrawal/withdrawal.service';
import { AdcontentComponent } from './adcontent/adcontent.component';

@NgModule({
  declarations: [
    AdmindashComponent,
    ContentComponent,
    ProfileComponent,
    DepositComponent,
    WithdrawalComponent,
    AdcontentComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CommonModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AngularWebStorageModule,
    FormsModule,
  ],
  providers: [ContentService, DepositService, WithdrawalService],
})
export class AdminModule {}
