import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string ='';
  password: string ='';
  confirmPassword: string ='';

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.loginService.createUserWithEmailAndPassword(this.email, this.password)
      .then(result => {
        if(result) {
          this.loginService.signInWithEmailAndPassword(this.email, this.password);
        }
      });
  }
}
