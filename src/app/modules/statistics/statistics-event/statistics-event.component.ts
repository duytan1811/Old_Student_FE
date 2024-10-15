import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
import { Observable } from 'rxjs';
import { PageInfoService } from 'src/app/_metronic/layout';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { EventModel } from 'src/app/shared/models/event/event.model';
import { EventByMonthModel } from 'src/app/shared/models/statistics/event-by-month.model';
import { StatisticsService } from 'src/app/shared/services/statistics/statistics.service';
import * as state from 'src/app/shared/state';

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
  public eventList$: Observable<Array<EventModel>>;
  public isLoading$: Observable<boolean>;
  public totalEvent$: Observable<number>;
  public userView$: Observable<BaseViewModel>;

  constructor(
    private statisticsService: StatisticsService,
    private viewState: state.ViewState,
    private eventState: state.EventState,
    private title: Title,
    private pageInfo: PageInfoService,
    private commonState:state.CommonState,
  ) {}

  ngOnInit(): void {
    this.pageInfo.updateTitle('Thống kê sự kiện');
    this.title.setTitle('Thống kê sự kiện');
    this.getEventByMonth();

    this.eventList$ = this.eventState.eventList$;
    this.totalEvent$ = this.eventState.totalEvent$;
    this.userView$ = this.viewState.view$;

    this.onSearch();
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();

    viewState.searchParams = {};
    viewState.sorting.column = 'CountEventRegister';
    this.viewState.setViewState(viewState);
    this.eventState.search(viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.eventState.search(viewState);
  }

  public async onExportTemplate() {
    const result = await this.eventState.exportExcel();
    const fileName = "StatistcsEvent.xlsx";
    this.commonState.convertBase64ToFile(result.data, fileName, FileConstants.XLSX);
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
          if (countEventList && months) {
            this.initChartEventByMonth(countEventList, months);
          }
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
