import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-attachment-dialog',
  templateUrl: './attachment-dialog.component.html',
  styleUrls: ['./attachment-dialog.component.scss'],
})  
export class AttachmentDialogComponent implements OnInit, OnDestroy {
  @Output() files = new EventEmitter<{ file: [] }>();
  fileUpload: any = [];
  constructor() {}

  ngOnInit() {}

  ngOnDestroy(): void {}

  onSelect(event:any) {
  for (var index = 0; index < event.currentFiles.length; index++) {
    this.fileUpload.push(event.currentFiles[index]);
  }
}

  onClear() {
    this.fileUpload = []
  }

  onUploadFile(event: any) {
    this.files.emit({ file: this.fileUpload });
  }

  deleteFile(file: File, uploader: FileUpload) {
    uploader.files.splice(uploader.files.indexOf(file),1);
    this.fileUpload.splice(uploader.files.indexOf(file),1);
    this.files.emit({ file: this.fileUpload });
  }

}
