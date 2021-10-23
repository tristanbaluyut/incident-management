import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert-section',
  templateUrl: './alert-section.component.html',
  styleUrls: ['./alert-section.component.scss']
})
export class AlertSectionComponent implements OnInit {

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
  }


  getMessage(): string {
    return this.alertService.getMessage();
  }

  getType(): string {
    return this.alertService.getType();
  }

  getVisible(): boolean {
    return this.alertService.getVisible();
  }

  setVisible(visible: boolean): void {
    this.alertService.setVisible(visible);
  }
}
