import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { FormsModule } from '@angular/forms';
//import { LocalStorage } from "@ngx-pwa/local-storage";
import { AngularWebStorageModule } from 'angular-web-storage';
import { Angular4PaystackModule } from 'angular4-paystack';

import { HomeComponent } from '../start/home/home.component';
import { NavComponent } from '../start/nav/nav.component';
import { RegisterComponent } from '../start/register/register.component';
import { LoginComponent } from '../start/login/login.component';
import { ContactComponent } from '../start/contact/contact.component';
import { StartRoutingModule } from './start-routing.module';
import { FaqComponent } from './faq/faq.component';
import { AboutComponent } from './about/about.component';
import { StartingComponent } from './starting/starting.component';
import { VerifyComponent } from './verify/verify.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { ResetComponent } from './reset/reset.component';
import { InvestComponent } from './invest/invest.component';
import { PayedComponent } from './payed/payed.component';
@NgModule({
  declarations: [
    NavComponent,
    HomeComponent,
    ContactComponent,
    RegisterComponent,
    LoginComponent,
    FaqComponent,
    AboutComponent,
    StartingComponent,
    VerifyComponent,
    ForgotpassComponent,
    ResetComponent,
    InvestComponent,
    PayedComponent,
  ],
  imports: [
    CommonModule,
    StartRoutingModule,
    CommonModule,
    ToastrModule.forRoot(),
    Angular4PaystackModule.forRoot(
      'pk_test_1c8ffc3fc5b6558d3a5a34fb3af6e3ed854fb57c'
    ),
    //  LocalStorage,
    HttpClientModule,
    AngularWebStorageModule,
    FormsModule,
  ],
  providers: [],
})
export class StartModule {}
