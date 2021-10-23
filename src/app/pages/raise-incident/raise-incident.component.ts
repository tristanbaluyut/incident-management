import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RaiseIncident } from 'src/app/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { DatabaseService } from 'src/app/services/database.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-raise-incident',
  templateUrl: './raise-incident.component.html',
  styleUrls: ['./raise-incident.component.scss']
})
export class RaiseIncidentComponent implements OnInit {

  incident: RaiseIncident = {
    subject: '',
    description: '',
    no: 0,
    createdBy: '',
    status: 'Pending',
    category: ''
  }

  constructor(private databaseService: DatabaseService,
    private loginService: LoginService,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.databaseService.getIncidents();
  }

  submit() {
    this.incident.no = Date.now();
    this.incident.createdBy = this.loginService.getCurrentUserId() || '';
    this.databaseService.submitIncident(this.incident)
      .then(() => {
        this.alertService.setAlert('Incident is submitted', 'alert-success', true);
        this.router.navigate(['/incidents']);
      }).catch((error) => {
        console.log(error)
      });
  }
}
