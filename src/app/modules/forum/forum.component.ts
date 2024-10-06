import { Component, OnInit, } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageInfoService } from 'src/app/_metronic/layout';
@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: [],
})
export class ForumComponent implements OnInit {
  public tabSelected: string = 'news';

  constructor(
    private title:Title,
    private pageInfo:PageInfoService
  ) { }

  ngOnInit(): void {
 this.title.setTitle('Diễn đàn');
 this.pageInfo.updateTitle('Diễn đàn');
  }

  public onChangeTab(tab: string) {
    this.tabSelected= tab;
  }
}
