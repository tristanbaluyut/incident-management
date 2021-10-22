import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Incident } from 'src/app/interfaces/incident';

@Component({
  selector: 'app-incidents-list',
  templateUrl: './incidents-list.component.html',
  styleUrls: ['./incidents-list.component.scss']
})
export class IncidentsListComponent implements OnInit {

  @Input() incidents?: Incident[];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  view(incidentNo: number): void {
    this.router.navigate(["/incident"], {})
  }
}
