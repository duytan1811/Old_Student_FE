import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { StatisticsService } from 'src/app/shared/services/statistics/statistics.service';
import {
  ApexAnnotations,
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent,
} from 'ng-apexcharts';
import * as state from 'src/app/shared/state';
import { Title } from '@angular/platform-browser';
import { PageInfoService } from 'src/app/_metronic/layout';
import { Observable } from 'rxjs';
import { NewsModel } from 'src/app/shared/models/news/news.model';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { NewsByMonthModel } from 'src/app/shared/models/statistics/news-by-month.model';

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
  selector: 'app-statistics-news',
  templateUrl: './statistics-news.component.html',
  styleUrls: [],
})
export class StatisticsNewsComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: any = null;

  public newsList$: Observable<Array<NewsModel>>;
  public totalNews$: Observable<number>;
  public userView$: Observable<BaseViewModel>;

  constructor(
    private statisticsService: StatisticsService,
    private viewState: state.ViewState,
    private newsState: state.NewsState,
    private title: Title,
    private pageInfo: PageInfoService,
    private commonState: state.CommonState
  ) {}

  ngOnInit(): void {
    this.pageInfo.updateTitle('Thống kê thành viên');
    this.title.setTitle('Thống kê thành viên');
    this.getNewsByMonth();

    this.newsList$ = this.newsState.newsList$;
    this.totalNews$ = this.newsState.totalNews$;
    this.userView$ = this.viewState.view$;
    this.onSearch();
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();

    viewState.searchParams = {};
    viewState.sorting.column = 'CountComment';

    this.viewState.setViewState(viewState);
    this.newsState.search(viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.newsState.search(viewState);
  }

  public async onExportTemplate() {
    const result = await this.newsState.exportExcel();
    const fileName = 'StatistcsNews.xlsx';
    this.commonState.convertBase64ToFile(
      result.data,
      fileName,
      FileConstants.XLSX
    );
  }

  private getNewsByMonth() {
    this.statisticsService.getNewsByMonth().subscribe({
      next: (res: BaseResponse<Array<NewsByMonthModel>>) => {
        if (res && res.data) {
          const countNewsList = res.data.map((item) => {
            return item.countNews;
          });
          const months = res.data.map((item) => {
            return `Tháng ${item.month}`;
          }) as Array<string>;
          if (countNewsList && months) {
            this.initChartNewsByMonth(countNewsList, months);
          }
        }
      },
    });
  }

  private initChartNewsByMonth(data: Array<any>, categories: Array<any>) {
    this.chartOptions = {
      series: [
        {
          name: 'Bài viết',
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
        text: 'Số bài viết theo từng tháng',
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
