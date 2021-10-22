import { Component, OnInit } from '@angular/core';
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
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    
  }

  onClick(): void {
    this.loginService.signInWithEmailAndPassword(this.email, this.password)
  }

  onGoogleClick(): void {
    this.loginService.signInWithPopupGoogle();
  }
}
