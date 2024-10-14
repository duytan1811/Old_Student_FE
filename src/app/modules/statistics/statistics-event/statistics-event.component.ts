import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexAnnotations,
} from 'ng-apexcharts';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { EventByMonthModel } from 'src/app/shared/models/statistics/event-by-month.model';
import { StatisticsService } from 'src/app/shared/services/statistics/statistics.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  annotations: ApexAnnotations;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  labels: string[];
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-statistics-event',
  templateUrl: './statistics-event.component.html',
  styleUrls: [],
})
export class StatisticsEventComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: any = null;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.getEventByMonth();
  }

  private getEventByMonth() {
    this.statisticsService.getEventByMonth().subscribe({
      next: (res: BaseResponse<Array<EventByMonthModel>>) => {
        if (res && res.data) {
          const countEventList = res.data.map((item) => {
            return item.countEvent;
          });
          const months = res.data.map((item) => {
            return `Tháng ${item.month}`;
          }) as Array<string>;
          this.initChartEventByMonth(countEventList, months);
        }
      },
    });
  }

  private initChartEventByMonth(data: Array<any>, categories: Array<any>) {
    this.chartOptions = {
      series: [
        {
          name: 'Sự kiện',
          data: data,
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Thống kê sự kiện theo tháng',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: categories,
      },
    };
  }
}
