import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PageInfoService } from 'src/app/_metronic/layout';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: [],
})
export class ForumComponent implements OnInit {
  public tabSelected: string = 'news';
  public titleTab: string = 'Bài viết';

  constructor(
    private title: Title,
    private pageInfo: PageInfoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tabSelected = this.router.url.split('/')[2];
    this.title.setTitle('Diễn đàn');
    this.pageInfo.updateTitle('Diễn đàn');
  }

  public onChangeTab(tab: string) {
    this.tabSelected = tab;
    if (tab === 'news') {
      this.titleTab = 'Bài viết';
    } else if (tab === 'job') {
      this.titleTab = 'Việc làm';
    }
    this.router.navigate([`/forums/${tab}`]);
  }
}
