import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/interfaces';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users?: UserRole[];

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.getUserRoles()
      .then(data => {
        this.users = data;
      });
  }

}
