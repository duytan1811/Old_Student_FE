import { Component, Input, OnInit } from '@angular/core';
import { StatusEnum } from 'src/app/shared/enum/status.enum';
import * as state from 'src/app/shared/state';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: [],
})
export class StatusBadgeComponent implements OnInit {
  public statusEnum = StatusEnum;
  @Input() status?: number;
  @Input() statusName?: string;

  constructor() {}

  ngOnInit(): void {}
}
