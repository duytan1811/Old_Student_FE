export class SelectListItem {
  value: string;
  text: string;
  selected: boolean;

  constructor() {
    this.value = '';
    this.text = '';
    this.selected = false;
  }
}