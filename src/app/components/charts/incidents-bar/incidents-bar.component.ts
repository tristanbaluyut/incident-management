import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-incidents-bar',
  templateUrl: './incidents-bar.component.html',
  styleUrls: ['./incidents-bar.component.scss']
})
export class IncidentsBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  barChartLabels: Label[] = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  barChartType: ChartType = 'line';
  barChartLegend = true;

  barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55], label: 'Payment' },
    { data: [28, 48, 40, 19, 46, 27], label: 'Delivery' },
    { data: [12, 23, 40, 34, 23, 45], label: 'Product' },
    { data: [28, 23, 12, 21, 29, 27], label: 'Service' }
  ];

  // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
