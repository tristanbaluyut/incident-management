import { Component, OnInit } from '@angular/core';
import { equalTo } from '@firebase/database';
import { Profile } from 'src/app/interfaces';
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

  constructor(private loginService: LoginService,
    private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.email = this.loginService.getCurrentUserEmail() || ''
    this.uid = this.loginService.getCurrentUserId();
    if (this.uid) {
      this.databaseService.getUserProfile(this.uid)
        .then(data => {
          if (data) {
            this.profile = data;
          }
        });
    }
  }

  save(): void {
    let uid = this.loginService.getCurrentUserId();
    if (uid && this.profile) {
      this.databaseService.saveUserProfile(uid, this.profile);
    }
  }
}
