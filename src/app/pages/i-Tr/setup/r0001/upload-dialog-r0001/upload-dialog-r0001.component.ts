import { Component, OnInit, OnDestroy } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Paging } from 'src/app/models/paging';
import { R0001Service } from 'src/app/pages/i-Tr/setup/r0001/r0001.service';
import { DataUpload, ReceivableUploadHeader } from 'src/app/pages/i-Tr/setup/r0001/receivable';
@Component({
  selector: 'app-upload-dialog-r0001',
  templateUrl: './upload-dialog-r0001.component.html',
  styleUrls: ['./upload-dialog-r0001.component.scss'],
})
export class UploadDialogR0001Component implements OnInit, OnDestroy {
  uploadedFiles: any[] = [];
  cols: any[] = [];
  informations: DataUpload[] = [];
  headerData!: ReceivableUploadHeader;
  paging!: Paging;
  isDisableConfirm: boolean = true;
  isDisableDownload: boolean = true;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private service: R0001Service
  ) { }

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

  ngOnDestroy(): void {}

  onPageChange(e: any) {
    this.paging.pageSize = e.rows;
    this.paging.page = e.page + 1;
    // this.findAll();
  }

  onUpload(event: any) {
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
    }
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
        this.uploadedFiles = [];
        this.headerData = resp;
        if (this.headerData.data?.uploadFileId) {
          this.service.searchUploadDetailsItrReceivableOption(this.headerData.data?.uploadFileId, this.paging.page, this.paging.pageSize).subscribe(
            resp => {
              if (resp.header?.code === '200') {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: resp.header.desc,
                  life: 3000,
                });
                this.informations = resp.data;
                this.paging.totalAll = resp.paging!.totalAll;
                this.isDisableConfirm = this.headerData.data!.successRecord! > 0 ? false : true;
                this.isDisableDownload = false;
                // this.findAll();
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error !',
                  detail: "No record found",
                  life: 3000,
                });
              }
            },
            error => {
              console.log('error : ', error);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
            }
          );
        }
      },
      error => {
        console.log('error : ', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
      });
  }


  onConfirm() {
    if (this.headerData.data?.uploadFileId) {
      this.service.saveUploadDetailsItrReceivableOption(this.headerData.data?.uploadFileId).subscribe(
        resp => {
          if (resp) {
            if (resp.header?.code === '200') {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: resp.header.desc,
                life: 3000,
              });
              this.informations = resp.data ? resp.data : [];
              this.isDisableConfirm = true;
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error !',
                detail: "No record found",
                life: 3000,
              });
            }
          }
        },
        error => {
          console.log('error : ', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
        }
      );
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error !',
        detail: "No data",
        life: 3000,
      });
    }
  }

  onClear() {
    this.uploadedFiles = [];
    this.informations = [];
    this.isDisableConfirm = true;
    this.isDisableDownload = true;
  }

  onDownload() {
    if (this.headerData.data?.uploadFileId) {
      this.service.downloadZipItrReceivableOption(this.headerData.data?.uploadFileId);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error !',
        detail: "No data",
        life: 3000,
      });
    }
  }
}
