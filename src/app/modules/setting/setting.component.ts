import { Component, OnInit } from '@angular/core';
import { SettingConstants } from 'src/app/shared/constants/setting-constants';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  settingTypes = SettingConstants.TYPES;
  constructor() { }

  ngOnInit(): void {
  }
}
