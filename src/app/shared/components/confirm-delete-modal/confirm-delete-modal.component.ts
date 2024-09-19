import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: []
})
export class ConfirmDeleteModalComponent implements OnInit {

  modalTitle: string;
  modalContent: string;
  multiline: boolean = false;
  listContent: Array<string> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any) {
    
  }

  ngOnInit(): void {
    this.modalTitle = this.data.title || "Cảnh báo";
    this.modalContent = this.data.content || "Bạn có muốn xóa thông tin này?";
    if (this.data.multiline) {
      this.multiline = this.data.multiline;
      this.listContent = this.data.listContent || [];
    }
  }
}
