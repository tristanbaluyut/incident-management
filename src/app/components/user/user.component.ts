import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/interfaces';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() uid?: string;

  profile?: Profile;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    if (this.uid) {
      this.databaseService.getUserProfileCache(this.uid)
        .then(data => {
          this.profile = data;
        })
    }
  }

}
