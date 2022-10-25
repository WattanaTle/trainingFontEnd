import { Component, OnInit, OnDestroy } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Receivable } from '../r0001/receivable';
import { R0001Service } from '../r0001/r0001.service';
import { Paging } from 'src/app/models/paging';
@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss'],
})
export class UploadDialogComponent implements OnInit, OnDestroy {
  uploadedFiles: any[] = [];
  cols: any[] = [];
  informations: Receivable[] = [];
  paging!: Paging;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private service: R0001Service
  ) {}

  ngOnInit() {
    this.cols = [
      { field: 'businessUnit', header: 'businessUnit' },
      { field: 'receivableOption', header: 'receivableOption' },
      { field: 'receiptType', header: 'receiptType' },
      { field: 'receivableActivity', header: 'receivableActivity' },
      { field: 'applyPremium', header: 'applyPremium' },
      { field: 'receiptAction', header: 'receiptAction' },
      { field: 'enable', header: 'enable' },
    ];

    this.paging = {
      page: 1,
      pageSize: 10,
      totalRow: 0,
      totalAll: 0,
      totalPage: 0,
      sortField: null,
      sortType: null,
      startRow: 0
    }
    // this.service.getData().subscribe((resp) => {
    //   this.informations = resp;
    // });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  onPageChange(e: any) {
    this.paging.pageSize = e.rows;
    this.paging.page = e.page + 1;
    // this.findAll();
  }

  onUpload(event: any) {
    console.log('-------------UPLOAD');
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  onSelect(event: any) {
    console.log('-------------onSelect');
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      console.log("name",file.name);
      
    }
   

    
    console.log("uploadedFiles",this.uploadedFiles);
    if (this.uploadedFiles[0].type === 'text/csv') {
      this.messageService.add({
        severity: 'info',
        summary: 'File Uploaded',
        detail: '',
      });
    } else {
      this.uploadedFiles = [];
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid file type',
        detail: '',
      });
    }
  }

  myUploader(event: any) {
    console.log('-------------UPLOAD');
    this.service.uploadFileItrReceivableOption(this.uploadedFiles[0]).subscribe(
      resp => {
        if (resp.header.code === '200') {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: resp.header.desc,
            life: 3000,
          });
          this.informations = resp.data;
          this.paging.totalAll = resp.paging!.totalAll;
          this.uploadedFiles = [];
          // this.findAll();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error !',
            detail: resp.header.desc,
            life: 3000,
          });
        }
      },
      error => {
        console.log('error : ', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
      });
  }

  onClear() {
    this.uploadedFiles = [];
  }
}
