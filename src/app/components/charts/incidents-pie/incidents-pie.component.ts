import { Component, Input, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { IncidentRow } from 'src/app/interfaces';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-incidents-pie',
  templateUrl: './incidents-pie.component.html',
  styleUrls: ['./incidents-pie.component.scss']
})
export class IncidentsPieComponent implements OnInit {

  initComplete: boolean = false;
  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {

    this.databaseService.getIncidents()
      .then(data => {

        data.forEach(item => {

          switch (item.status) {
            case 'Pending':
              this.pieChartData[0]++;
              break;
            case 'InProgress':
              this.pieChartData[1]++;
              break;
            case 'Resolved':
              this.pieChartData[2]++;
              break;
            case 'Closed':
              this.pieChartData[3]++;
              break;
          }
        })

        this.initComplete = true;
      });
  }

  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  pieChartLabels: Label[] = ['Pending', 'InProgress', 'Resolved', 'Closed'];
  pieChartData: number[] = [0, 0, 0, 0];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,255,0,0.3)'],
    },
  ];

  // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
