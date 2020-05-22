import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
declare let $;
@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss'],
})
export class ForgotpassComponent implements OnInit {
  constructor(
    private server: DataService,
    private route: Router,
    private toastr: ToastrManager
  ) {}

  ngOnInit() {
    $('.loader').fadeOut();
    $('#preloder').delay(400).fadeOut('slow');
  }

  forgotPass(x: NgForm) {
    var emailRe = /^.+@.+\..{2,4}$/;
    if (x.value.email.match(emailRe)) {
      let forgot = {
        email: x.value.email,
        key: 'forgot',
      };
      this.server.Api(forgot).subscribe((res) => {
        if (res['code'] == 1) {
          this.toastr.successToastr('Message sent successfully', 'Security');
          x.reset();
        } else if (res['code'] == 2) {
          this.toastr.warningToastr('Input a correct email', 'Security');
          x.reset();
        }
        x.reset();
      });
    }
  }
}
