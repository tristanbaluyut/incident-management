import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { DatabaseService } from './services/database.service';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'incident-management';
  isLogin: boolean = false;

  constructor(
    private loginService: LoginService,
    private databaseService: DatabaseService,
    private router: Router) { }

  loginCallback(user?: User): any {
    if (user === undefined) {
      this.isLogin = false;
      if (this.router.url !== '/register' && this.router.url !== '') {
        this.router.navigate(['/login'])
      }
    } else {
      this.isLogin = true;
      if (this.router.url === '/login' || this.router.url === '/register') {
        let uid = this.loginService.getCurrentUserId();

        this.databaseService.getUserProfileCache(uid || '')
          .then
          (data => {
            if (data.role === 'Admin') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/incidents']);
            }
          });
      }
    }
  }

  ngOnInit(): void {
    this.loginService.subscribe(this.loginCallback.bind(this));
  }
}
