import { Component, OnInit } from '@angular/core';
import { IncidentRow } from 'src/app/interfaces';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {

  incidents: IncidentRow[] = []

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.getIncidents()
      .then((data) => {
        this.incidents = data;
        console.log(data);
      });
  }
}
