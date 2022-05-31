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
      this.alertService.setAlert('Password not match', 'alert-warning', false);
      return;
    }

    var anUpperCase = /[A-Z]/;
    var aLowerCase = /[a-z]/;
    var aNumber = /[0-9]/;
    var aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    var obj = {};

    if (this.password.length < 8) {
      this.alertService.setAlert('Password should atleast 8 characters in length', 'alert-warning', false);
      return;
    }

    var numUpper = 0;
    var numLower = 0;
    var numNums = 0;
    var numSpecials = 0;
    for (var i = 0; i < this.password.length; i++) {
      if (anUpperCase.test(this.password[i]))
        numUpper++;
      else if (aLowerCase.test(this.password[i]))
        numLower++;
      else if (aNumber.test(this.password[i]))
        numNums++;
      else if (aSpecial.test(this.password[i]))
        numSpecials++;
    }

    if (numUpper < 1 || numLower < 1 || numNums < 1 || numSpecials < 1) {
      this.alertService.setAlert('Password complexity check fails, should contain atleast one of each ofthe following: locawercase, uppercase, numeric and special character', 'alert-warning', false);
      return;
    }

    this.loginService.createUserWithEmailAndPassword(this.email, this.password)
      .then(result => {
        if (result) {
          this.loginService.signInWithEmailAndPassword(this.email, this.password);
        } else {
          this.alertService.setAlert('Unable to register email address', 'alert-danger', false);
        }
      });
  }
}
