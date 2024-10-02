import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-blog-detail-dialog',
  templateUrl: './blog-detail-dialog.component.html',
  styleUrls: []
})
export class BlogDetailDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BlogDetailDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

}
