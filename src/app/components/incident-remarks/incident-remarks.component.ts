import { Component, Input, OnInit } from '@angular/core';
import { RemarksRow } from 'src/app/interfaces';

@Component({
  selector: 'app-incident-remarks',
  templateUrl: './incident-remarks.component.html',
  styleUrls: ['./incident-remarks.component.scss']
})
export class IncidentRemarksComponent implements OnInit {

  @Input() remarksList?: RemarksRow[];

  constructor() { }

  ngOnInit(): void {
  }

}
