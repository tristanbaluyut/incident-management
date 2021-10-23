import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidentDetails, SubmitRemarks } from 'src/app/interfaces';
import { DatabaseService } from 'src/app/services/database.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.scss']
})
export class IncidentDetailsComponent implements OnInit {
  private key: string | null = '';
  incident?: IncidentDetails = undefined;
  remarks: string = '';


  constructor(private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.key = this.route.snapshot.paramMap.get('key');
    this.loadIncident();
  }

  loadIncident(): void {
    if (this.key !== null) {
      this.databaseService.getIncidentByKey(this.key)
        .then((data) => {
          this.incident = data;
        });
    }
  }

  submitStatus(status: string): void {
    if (this.key !== null) {
      this.databaseService.setIncidentStatus(this.key, status)
        .then(() => {
          this.loadIncident();
        });
    }
  }

  submit(status: string): void {
    let remarks: SubmitRemarks = {
      date: Date.now(),
      status: status,
      remarks: this.remarks,
      user: this.loginService.getCurrentUserId() || ''
    }
    if (this.key !== null) {
      this.databaseService.submitRemarks(this.key, remarks)
        .then(() => {
          this.submitStatus(status);
        });
    }
  }

  canSubmit(action: string): boolean {
    switch(action) {
      case 'Submit':
        return this.incident?.status === 'Resolved';
      case 'InProgress':
        return this.incident?.status === 'Pending' || this.incident?.status === 'InProgress';
      case 'Resolve':
        return this.incident?.status === 'InProgress' || this.incident?.status === 'Pending';
      case 'Close':
        return this.incident?.status === 'Resolved';
      default:
        return false;
    }
  }
}
