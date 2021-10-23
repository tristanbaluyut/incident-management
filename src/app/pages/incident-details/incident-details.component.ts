import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IncidentDetails, Profile, SubmitRemarks } from 'src/app/interfaces';
import { AlertService } from 'src/app/services/alert.service';
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
  createdBy?: Profile;
  currentUserId?: string;


  constructor(private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private loginService: LoginService,
    private alertService:AlertService) { }

  ngOnInit(): void {
    this.key = this.route.snapshot.paramMap.get('key');
    this.currentUserId = this.loginService.getCurrentUserId();
    this.loadIncident();
  }

  loadCreatedBy(): void {
    if (this.incident) {
      this.databaseService.getUserProfileCache(this.incident.createdBy)
        .then(data => {
          this.createdBy = data;
        })
    }
  }

  loadIncident(): void {
    if (this.key !== null) {
      if (isNaN(+this.key)) {
        this.databaseService.getIncidentByKey(this.key)
          .then((data) => {
            this.incident = data;
            this.loadCreatedBy();
          });
      } else {
        this.databaseService.getIncident(+this.key)
          .then((data) => {
            this.incident = data;
            this.key = data.key;
            this.loadCreatedBy();
          });
      }
    }
  }

  submitStatus(status: string): void {
    if (this.key !== null) {
      this.databaseService.setIncidentStatus(this.key, status)
        .then(() => {
          this.loadIncident();
          this.alertService.setAlert('Remarks posted successfully', 'alert-success', false);
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
          this.remarks = '';
        });
    }
  }

  canSubmit(action: string): boolean {
    switch (action) {
      case 'Submit':
        return this.incident?.createdBy === this.currentUserId;
      case 'OpSubmit':
        return this.incident?.status === 'Resolved' && this.incident?.createdBy !== this.currentUserId;
      case 'InProgress':
        return (this.incident?.status === 'Pending' || this.incident?.status === 'InProgress')
          && this.incident?.createdBy !== this.currentUserId;
      case 'Resolve':
        return (this.incident?.status === 'InProgress' || this.incident?.status === 'Pending')
          && this.incident?.createdBy !== this.currentUserId;
      case 'Close':
        return this.incident?.status === 'Resolved' && this.incident?.createdBy === this.currentUserId;
      default:
        return false;
    }
  }
}
