import { Component, Input, OnInit } from '@angular/core';
import { Profile, UserRole } from 'src/app/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { DatabaseService } from 'src/app/services/database.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Input() users?: UserRole[];
  currentUid: string = '';

  constructor(private databaseService: DatabaseService,
    private loginService: LoginService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.currentUid = this.loginService.getCurrentUserId() || '';
  }

  add(i: number): void {
    if (this.users) {
      this.users[i].role = 'Admin';
      this.databaseService.setRole(this.users[i].uid, 'Admin')
      .then(() => {
        this.alertService.setAlert('Admin role added', 'alert-success',false);
      });
    }
  }

  remove(i: number): void {
    if (this.users) {
      this.users[i].role = '';
      this.databaseService.setRole(this.users[i].uid, '')
        .then(() => {
          this.alertService.setAlert('Admin role removed', 'alert-success',false);
        });
    }
  }
}
