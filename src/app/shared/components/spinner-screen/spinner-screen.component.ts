import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner-screen',
  templateUrl: './spinner-screen.component.html',
  styleUrls: ['./spinner-screen.component.scss']
})
export class SpinnerScreenComponent implements OnInit {

  @Input() isLoading: boolean | null;
  constructor() { }

  ngOnInit(): void {
  }

}
