import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private loginService: LoginService,
    private alertService: AlertService) { }

  ngOnInit(): void {
  }

  submit(): void {

    var emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if (!emailFormat.test(this.email.toLocaleLowerCase())) {
      this.alertService.setAlert('Invalid Email Address', 'alert-warning', false);
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.alertService.setAlert('Password not match', 'alert-danger', false);
    } else {
      this.loginService.createUserWithEmailAndPassword(this.email, this.password)
        .then(result => {
          if (result) {
            this.loginService.signInWithEmailAndPassword(this.email, this.password);
          } else {
            this.alertService.setAlert('Invalid Email or Password', 'alert-danger', false);
          }
        });
    }
  }
}
