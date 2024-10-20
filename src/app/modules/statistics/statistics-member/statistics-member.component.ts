import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
import { Observable } from 'rxjs';
import { PageInfoService } from 'src/app/_metronic/layout';
import { FileConstants } from 'src/app/shared/constants/file-constants';
import { BaseResponse } from 'src/app/shared/models/base/base-response.model';
import { BaseViewModel } from 'src/app/shared/models/base/base-view.model';
import { Paginator } from 'src/app/shared/models/base/paginator.model';
import { MemberByMonthModel } from 'src/app/shared/models/statistics/member-by-month.model';
import { StudentByMajorModel } from 'src/app/shared/models/statistics/student-by-major.model';
import { StudentByYearModel } from 'src/app/shared/models/statistics/student-by-year.model';
import { UserModel } from 'src/app/shared/models/users/user.model';
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
  selector: 'app-statistics-member',
  templateUrl: './statistics-member.component.html',
  styleUrls: [],
})
export class StatisticsMemberComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: any = null;

  public userList$: Observable<Array<UserModel>>;
  public totalUser$: Observable<number>;
  public userView$: Observable<BaseViewModel>;

  public studentByMajors: Array<StudentByMajorModel>;
  public studentByYear: Array<StudentByYearModel>;

  constructor(
    private statisticsService: StatisticsService,
    private viewState: state.ViewState,
    private userState: state.UserState,
    private title: Title,
    private pageInfo: PageInfoService,
    private commonState: state.CommonState
  ) { }

  ngOnInit(): void {
    this.pageInfo.updateTitle('Thống kê thành viên');
    this.title.setTitle('Thống kê thành viên');
    this.getMemberByMonth();


    this.userList$ = this.userState.users$;
    this.totalUser$ = this.userState.totalUser$;
    this.userView$ = this.viewState.view$;
    this.onSearch();
    this.getStudentByMajor();
    this.getStudentByYear();
  }

  public onSearch() {
    const viewState = this.viewState.getViewState();

    viewState.searchParams = {};
    this.viewState.setViewState(viewState);
    this.userState.search(viewState);
  }

  public paginate(paginator: Paginator) {
    const viewState = this.viewState.getViewState();
    viewState.paginator = paginator;
    this.viewState.setViewState(viewState);
    this.userState.search(viewState);
  }

  public async onExportTemplate() {
    const result = await this.userState.exportExcel();
    const fileName = 'StatistcsMember.xlsx';
    this.commonState.convertBase64ToFile(
      result.data,
      fileName,
      FileConstants.XLSX
    );
  }

  private getMemberByMonth() {
    this.statisticsService.getMemberByMonth().subscribe({
      next: (res: BaseResponse<Array<MemberByMonthModel>>) => {
        if (res && res.data) {
          const countMemberList = res.data.map((item) => {
            return item.countMember;
          });
          const months = res.data.map((item) => {
            return `Tháng ${item.month}`;
          }) as Array<string>;
          if (countMemberList && months) {
            this.initChartMemberByMonth(countMemberList, months);
          }
        }
      },
    });
  }

  private getStudentByMajor() {
    this.statisticsService.getStudentByMajor().subscribe({
      next: (res: BaseResponse<Array<StudentByMajorModel>>) => {
        if (res && res.data) {
          this.studentByMajors = res.data
        }
      },
    });
  }

  private getStudentByYear() {
    this.statisticsService.getStudentByYear().subscribe({
      next: (res: BaseResponse<Array<StudentByYearModel>>) => {
        if (res && res.data) {
          this.studentByYear = res.data
        }
      },
    });
  }

  private initChartMemberByMonth(data: Array<any>, categories: Array<any>) {
    this.chartOptions = {
      series: [
        {
          name: 'Thành viên',
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
        text: 'Số thành viên theo từng tháng',
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
