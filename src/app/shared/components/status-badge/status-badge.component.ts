import { Component, Input, OnInit } from '@angular/core';
import { StatusEnum } from 'src/app/shared/enum/status.enum';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss']
})
export class StatusBadgeComponent implements OnInit {
  public statusEnum = StatusEnum;
  @Input() status:number;

  constructor(private commonState:state.CommonState) { }

  ngOnInit(): void {
    console.log(status);
  }

  public getStatusString(statusKey?: number) {
    return this.commonState.getStatusString(statusKey);
  }

}
