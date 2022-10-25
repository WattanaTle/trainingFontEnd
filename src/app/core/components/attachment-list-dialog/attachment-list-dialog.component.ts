import { Component, EventEmitter, OnInit, Output, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { AttachmentListDialogService } from './attachment-list-dialog.service';
@Component({
  selector: 'app-attachment-list-dialog',
  templateUrl: './attachment-list-dialog.component.html',
  styleUrls: ['./attachment-list-dialog.component.scss'],
})
export class AttachmentListDialogComponent implements OnInit, OnDestroy, OnChanges {
  @Output() files = new EventEmitter<{ file: [] }>();
  @Input() fileList: any = [];
  fileUpload: any = [];
  constructor(private service: AttachmentListDialogService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void { }

  onSelect(event: any) {
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

  deleteFile(id: any) {

  }
  downloadFile(id: any) {
    console.log(id);
    this.service.download(id);
  }



}
