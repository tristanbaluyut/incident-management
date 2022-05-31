import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-incidents-bar',
  templateUrl: './incidents-bar.component.html',
  styleUrls: ['./incidents-bar.component.scss']
})
export class IncidentsBarComponent implements OnInit {

  initComplete: boolean = false;
  constructor(private databaseService: DatabaseService) { }


  ngOnInit(): void {
    this.databaseService.getIncidents()
      .then(data => {

        data.forEach(item => {
          let date = new Date(item.no);
          let itemVector = (date.getFullYear() * 12) + (date.getMonth());

          if (this.vector.indexOf(itemVector) < 0) {
            this.vector.push(itemVector);
          };
        });

        this.vector = this.vector.sort();

        let payment: number[] = []
        let delivery: number[] = []
        let product: number[] = []
        let service: number[] = []
        let other: number[] = []

        this.vector.forEach(x => {
          let label: string = '';

          var year = Math.floor(x / 12);
          var month = x - (year * 12);

          const d = new Date();
          d.setMonth(month);
          const monthName = d.toLocaleString("default", { month: "long" });

          this.barChartLabels.push(monthName + ' ' + year);

          payment.push(0);
          delivery.push(0);
          product.push(0);
          service.push(0);
          other.push(0);
        });


        data.forEach(item => {

          let date = new Date(item.no);
          let itemVector = (date.getFullYear() * 12) + (date.getMonth());
          let idx: number = this.vector.indexOf(itemVector);

          switch (item.category) {
            case 'Payment':
              payment[idx]++;
              break;
            case 'Delivery':
              delivery[idx]++;
              break;
            case 'Product':
              product[idx]++;
              break;
            case 'Service':
              service[idx]++;
              break;
            case 'Other':
              other[idx]++;
              break;
          }

        })

        this.barChartData.push({ data: payment, label: 'Payment' });
        this.barChartData.push({ data: delivery, label: 'Delivery' });
        this.barChartData.push({ data: product, label: 'Product' });
        this.barChartData.push({ data: service, label: 'Service' });
        this.barChartData.push({ data: other, label: 'Other' });

        this.initComplete = true;
      });
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
  vector: number[] = [];
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartData: ChartDataSets[] = [];

  // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


}
