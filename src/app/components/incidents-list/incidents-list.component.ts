import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncidentRow } from 'src/app/interfaces';
import { DatabaseService } from 'src/app/services/database.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-incidents-list',
  templateUrl: './incidents-list.component.html',
  styleUrls: ['./incidents-list.component.scss']
})
export class IncidentsListComponent implements OnInit {

  @Input() incidents?: IncidentRow[];
  role: string = '';
  uid: string = '';



  constructor(private router: Router,
    private loginService: LoginService,
    private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.uid = this.loginService.getCurrentUserId() || '';
    this.role = this.databaseService.getRoleCache(this.uid) || '';
  }

  getIncidents(): IncidentRow[] {
    if (this.incidents) {
      return this.incidents.filter(item => {
        return item.createdBy === this.uid ||
          this.role === 'Admin'
      }).sort((a,b) => {
        return b.no - a.no;
      })
    }
    else {
      return [];
    }
  }

  view(no: number): void {
    this.router.navigate(["/incident"], {})
  }
}
