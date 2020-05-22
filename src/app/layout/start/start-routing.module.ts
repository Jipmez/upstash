import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../start/home/home.component';
import { NavComponent } from '../start/nav/nav.component';
import { RegisterComponent } from '../start/register/register.component';
import { LoginComponent } from '../start/login/login.component';
import { ContactComponent } from '../start/contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { AboutComponent } from './about/about.component';
import { StartingComponent } from './starting/starting.component';
import { VerifyComponent } from './verify/verify.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { ResetComponent } from './reset/reset.component';
import { InvestComponent } from './invest/invest.component';
import { PayedComponent } from '../start/payed/payed.component';
import { AuthGuard } from '../../auth.guard';
const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'Faq', component: FaqComponent },
      { path: 'get_started', component: StartingComponent },
      { path: 'About', component: AboutComponent },
      { path: 'verify', component: VerifyComponent },
      { path: 'forgot_pass', component: ForgotpassComponent },
      { path: 'reset_pass/:id', component: ResetComponent },
      { path: 'invest', component: InvestComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'memberaccess', component: PayedComponent, canActivate: [AuthGuard] },
  /*  {
    path: "**",
    component: HomeComponent
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartRoutingModule {}
