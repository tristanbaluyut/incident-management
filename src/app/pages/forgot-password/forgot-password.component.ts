import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isSent: boolean = false;
  email: string = '';

  constructor(private loginService: LoginService,
    private alertService: AlertService) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.loginService.sendPasswordResetEmail(this.email)
    .then(() => { 
      this.isSent = true;
      this.alertService.setAlert('Password Reset Link is sent to your email', 'alert-success', false);
    });
  }
}
