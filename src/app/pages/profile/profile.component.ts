import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { DatabaseService } from 'src/app/services/database.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  email: string = '';
  uid: string | undefined = '';

  profile?: Profile;

  hasAlert: boolean = false;
  alertType: string = '';
  alertMessage: string = '';

  constructor(private loginService: LoginService,
    private databaseService: DatabaseService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.email = this.loginService.getCurrentUserEmail() || ''
    this.uid = this.loginService.getCurrentUserId();
    if (this.uid) {
      this.databaseService.getUserProfile(this.uid)
        .then(data => {
          if (data) {
            this.profile = data;

            if (data.firstName === '' ||
              data.lastName === '' ||
              data.middleName === '' ||
              data.contactNo === '') {

              this.alertService.setAlert('Please complete your profile first', 'alert-warning', false);
            }
          }
        });
    }
  }

  save(): void {
    let uid = this.loginService.getCurrentUserId();
    if (uid && this.profile) {
      this.profile.email = this.email;
      this.profile.role = 'Customer';

      this.databaseService.saveUserProfile(uid, this.profile)
        .then(() => {
          this.alertService.setAlert('Profile saved successfully', 'alert-success', false);
        }).catch(() => {
          this.alertService.setAlert('PFailed to save profile', 'alert-success', false);
        });
    }
  }

  dismiss(): void {
    this.hasAlert = false;
  }
}
