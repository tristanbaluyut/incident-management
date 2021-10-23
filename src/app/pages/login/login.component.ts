import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private loginService: LoginService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    
  }

  onClick(): void {
    this.loginService.signInWithEmailAndPassword(this.email, this.password)
      .then(result => {
        if(!result) {
          this.alertService.setAlert('Invalid Email or Password', 'alert-danger', false);
        }
      })
    
  }

  onGoogleClick(): void {
    this.loginService.signInWithPopupGoogle();
  }
}
