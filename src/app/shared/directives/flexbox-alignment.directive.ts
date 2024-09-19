import {Directive, Input, ElementRef, Output, HostListener, HostBinding, OnInit, EventEmitter} from '@angular/core';

@Directive({
  selector: '[appFlexboxAlignment]'
})
export class FlexboxAlignmentDirective implements OnInit{

  @Input() childrenWidth: number;

  @Output() numberItem: EventEmitter<number> = new EventEmitter<number>();

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.detachNumberItemPerRow()
  }

  @HostListener('window:resize', ['$event.target'])
  onResize() {
    this.detachNumberItemPerRow();
  }

  detachNumberItemPerRow(): void {
    const contentWidth = this.elementRef.nativeElement.clientWidth;
    const childrenWidth = this.childrenWidth;
    const itemPerRow =  Math.floor(contentWidth / childrenWidth);
    this.numberItem.emit(itemPerRow);
  }
}
