import { Component, OnInit, OnDestroy } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { R0003Service } from './../r0003.service';
import { DataUpload, ReceiptUpload, ReceiptUploadHeader, ReceiptUploadSave } from '../receipt';
import { Paging } from 'src/app/models/paging';
import { HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
  public destroy$: Subject<boolean> = new Subject<boolean>();
  uploadedFiles: any[] = [];
  cols: any[] = [];
  informations: DataUpload[] = [];
  headerData!: ReceiptUploadHeader;
  paging!: Paging;
  customUpload: boolean = true;
  isDisableConfirm: boolean = true;
  isDisableDownload: boolean = true;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private service: R0003Service
  ) { }

  ngOnInit() {
    this.cols = [
      { field: 'businessUnit', header: 'businessUnit' },
      { field: 'branch', header: 'branch' },
      { field: 'prefixCode', header: 'prefixCode' },
      { field: 'startDate', header: 'startDate' },
      { field: 'endDate', header: 'endDate' },
      { field: 'runningNumber', header: 'runningNumber' },
      { field: 'initialValue', header: 'initialValue' },
      { field: 'enable', header: 'enable' },
      { field: 'status', header: 'status' }
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
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    if (this.ref) {
      this.ref.close();
    }
  }

  public onPageChange(e: any): void {
    this.paging.pageSize = e.rows;
    this.paging.page = e.page + 1;
  }

  public myUploader(event: any): void {
    //TODO Loading mask
    this.service.uploadReceiptNumberRunning(this.uploadedFiles[0]).pipe(takeUntil(this.destroy$)).subscribe(
      (res: ReceiptUploadSave) => {
        if (res?.header?.code) {
          this.uploadedFiles = [];
          this.headerData = res.data;
          if (this.headerData.uploadFileId) {
            this.service.searchUploadDetailsReceiptNumberRunning(this.headerData.uploadFileId, this.paging.page, this.paging.pageSize).pipe(takeUntil(this.destroy$)).subscribe(
              (resp: HttpResponse<ReceiptUpload>) => {
                if (resp.status == 200) {
                  if (resp?.body?.header?.code) {
                    this.isDisableConfirm = this.headerData?.successRecord ? false : true;
                    this.isDisableDownload = false;
                    this.messageService.add({
                      severity: 'success',
                      summary: 'Successful',
                      detail: resp?.body?.header.desc,
                      life: 3000,
                    });
                    this.informations = resp?.body?.data ? resp?.body?.data : [];
                    this.paging.totalAll = resp?.body?.paging?.totalAll ? resp?.body?.paging?.totalAll : 0;
                  } else {
                    this.isDisableConfirm = true;
                    this.isDisableDownload = true;
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
                this.isDisableConfirm = true;
                this.isDisableDownload = true;
                this.messageService.add({ severity: 'error', summary: 'Error', detail: this.isNotEmpty(error?.error?.header?.desc) ? error.error.header.desc : error.error });
              }
            );
          }
        }
      }, error => {
        this.isDisableConfirm = true;
        this.isDisableDownload = true;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.isNotEmpty(error?.error?.header?.desc) ? error.error.header.desc : error.error });
      });
  }

  public onSelect(event: any): void {
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

  public upload(event: any): void {
    console.log('upload ==> ', event);
  }

  public onClear(): void {
    this.uploadedFiles = [];
    this.informations = [];
  }

  public onConfirm(): void {
    if (this.headerData.uploadFileId) {
      this.service.saveUploadDetailsReceiptNumberRunning(this.headerData.uploadFileId).pipe(takeUntil(this.destroy$)).subscribe(
        (res: ReceiptUpload) => {
          if (res) {
            this.isDisableDownload = true;
            if (res.header?.code) {
              this.isDisableConfirm = true;
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Successful',
                life: 3000,
              });
              this.informations = res.data ? res.data : [];
              this.paging.totalAll = res.paging?.totalAll ? res.paging?.totalAll : 0;
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
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.isNotEmpty(error?.error?.header?.desc) ? error.error.header.desc : error.error });
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
  public onDownload(): void {
    if (this.headerData.uploadFileId) {
      this.service.downloadUploadDetailsReceiptNumberRunning(this.headerData.uploadFileId);
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error !',
        detail: "No data",
        life: 3000,
      });
    }

  }

  public isNotEmpty(value: any): boolean {
    return !(value === '' || value === null || value === undefined);
  }
}
