import { Component, OnInit, OnDestroy } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-download-dialog',
  templateUrl: './download-dialog.component.html',
  styleUrls: ['./download-dialog.component.scss'],
})
export class DownloadDialogComponent implements OnInit, OnDestroy {
  files :any  = []

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

  ngOnInit() {
    console.log(this.config.data);
    this.files = this.config.data
  }

  ngOnDestroy(): void {}

  onDownload(item: any) {}

  getAttachment() {}
}
