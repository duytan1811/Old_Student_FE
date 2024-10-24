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
  ) { }

  ngOnInit(): void {
    this.tabSelected = this.router.url.split('/')[2];

    this.onChangeTab(this.tabSelected);
    this.title.setTitle('Diễn đàn');
    this.pageInfo.updateTitle('Diễn đàn');
    setTimeout(() => {
      this.onChangeTab(this.router.url.split('/')[2]);
    }, 100);
  }

  public onChangeTab(tab: string) {
    this.tabSelected = tab;
    if (tab === 'news') {
      this.titleTab = 'Bài viết';
    } else if (tab === 'event') {
      this.titleTab = 'Sự kiện';
    } else if (tab === 'job') {
      this.titleTab = 'Việc làm';
    }
    this.router.navigate([`/forum/${tab}`]);
  }
}
