import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DatabaseService } from './services/database.service';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private databaseService: DatabaseService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.loginService.isUserLogin()
      .then((result: boolean) => {
        if (state.url === '/login' || state.url === '/register' || state.url === '/forgot-password') {
          if (result) {

            let uid = this.loginService.getCurrentUserId();

            if (uid) {
              this.databaseService.getUserProfile(uid)
                .then(data => {
                  if (data.firstName !== '' &&
                    data.lastName !== '' &&
                    data.middleName !== '' &&
                    data.contactNo !== '') {
                    this.router.navigate(['/dashboard']);
                    return true;
                  } else {
                    this.router.navigate(['/profile']);
                    return false;
                  }
                });
            }
          }
          return !result;
        } else {
          let uid = this.loginService.getCurrentUserId();

          if (uid) {
            this.databaseService.getUserProfile(uid)
              .then(data => {
                if (data.firstName !== '' &&
                  data.lastName !== '' &&
                  data.middleName !== '' &&
                  data.contactNo !== '') {
                  return true;
                } else {
                  this.router.navigate(['/profile']);
                  return false;
                }
              });
          }
        }
        return result;
      });
  }
}
