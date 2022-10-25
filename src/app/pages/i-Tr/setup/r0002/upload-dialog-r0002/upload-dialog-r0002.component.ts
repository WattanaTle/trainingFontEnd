import { Component, OnInit, OnDestroy } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { R0002Service } from '../r0002.service';
import { Paging } from 'src/app/models/paging';
import { DataMstUpload, ReceiptUpload, ReceiptUploadHeader, ReceiptUploadSave } from '../receipt';
import { HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-upload-dialog-r0002',
  templateUrl: './upload-dialog-r0002.component.html',
  styleUrls: ['./upload-dialog-r0002.component.scss']
})
export class UploadDialogR0002Component implements OnInit, OnDestroy {
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public uploadedFiles: any[] = [];
  public cols: any[] = [];
  public informations: DataMstUpload[] = [];
  public headerData!: ReceiptUploadHeader;
  public paging!: Paging;
  public customUpload: boolean = true;
  public loading = false;
  public  isDisableConfirm: boolean = true;
  public  isDisableDownload: boolean = true;

  public constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
    private service: R0002Service
  ) { }

  public ngOnInit(): void {
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
    if (this.ref){
      this.ref.close();
    }
  }

  public onPageChange(e: any): void {
    this.paging.pageSize = e.rows;
    this.paging.page = e.page + 1;
  }

  public myUploader(event: any): void {
    //TODO Loading mask
    this.service.uploadFileItrConfirmationNumberRunning(this.uploadedFiles[0]).pipe(takeUntil(this.destroy$)).subscribe(
      (resp: ReceiptUploadSave) => {
        this.uploadedFiles = [];
        this.headerData = resp.data;
        if (this.headerData.uploadFileId) {
          this.service.searchUploadDetailsItrConfirmationNumberRunning(this.headerData.uploadFileId, this.paging.page, this.paging.pageSize).pipe(takeUntil(this.destroy$)).subscribe(
            (resp: HttpResponse<ReceiptUpload>) => {
              if(resp.status == 200) {
                if (resp?.body?.header.code) {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Successful',
                    life: 3000,
                  });
                  this.informations = resp?.body?.data;
                  this.paging.totalAll = resp?.body?.paging!.totalAll;
                  this.isDisableConfirm = this.headerData!.successRecord! > 0 ? false : true;
                  this.isDisableDownload = false;
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
              this.messageService.add({ severity: 'error', summary: 'Error', detail: this.isNotEmpty(error?.error?.header?.desc) ? error.error.header.desc : error.error });
            }
          );
        }
      },
      error => {
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

  public onClear(): void {
    this.uploadedFiles = [];
    this.informations = [];
    this.isDisableConfirm = true;
    this.isDisableDownload = true;
  }

  public onConfirm(): void {
    if (this.headerData.uploadFileId) {
      //TODO Loading mask
      this.service.saveUploadDetailsItrConfirmationNumberRunning(this.headerData.uploadFileId).pipe(takeUntil(this.destroy$)).subscribe(
        (resp: ReceiptUpload) => {
          if (resp) {
            if (resp.header?.code) {
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
      this.service.downloadZipItrConfirmationNumberRunning(this.headerData.uploadFileId);
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
