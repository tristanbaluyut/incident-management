import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncidentRow } from 'src/app/interfaces';

@Component({
  selector: 'app-incidents-list',
  templateUrl: './incidents-list.component.html',
  styleUrls: ['./incidents-list.component.scss']
})
export class IncidentsListComponent implements OnInit {

  @Input() incidents?: IncidentRow[];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  view(no: number): void {
    this.router.navigate(["/incident"], {})
  }
}
