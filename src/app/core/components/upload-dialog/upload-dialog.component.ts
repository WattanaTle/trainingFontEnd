import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss'],
})
export class UploadDialogComponent implements OnInit, OnDestroy {
  @Output() files = new EventEmitter<{ file: [] }>();
  fileUpload: any = [];

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  OnUploadFile(event: any) {
    this.fileUpload = [];
    for (var index = 0; index < event.target.files.length; index++) {
      this.fileUpload.push(event.target.files[index]);
    }
    this.files.emit({ file: this.fileUpload });
  }

  deleteFile(item: number) {
    this.fileUpload.splice(item, 1);
  }
}
