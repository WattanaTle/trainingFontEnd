import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Data, Lov, LovPage, Receipt } from './receipt';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UploadComponent } from './upload/upload.component';
import { R0003Service } from './r0003.service';
import { Paging } from 'src/app/core/models/paging';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-r0003',
  templateUrl: './r0003.component.html',
  styleUrls: ['./r0003.component.scss'],
})
export class R0003Component implements OnInit, OnDestroy {
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public informations: Data[] = [] as Data[];
  public formSave: FormGroup;
  public deleteRowData: Data = {} as Data;
  public selectedInformation: Data[] = [] as Data[];
  public submitted: boolean = false;
  public enableToggle = [{ code: 'Y', name: 'YES' }, { code: 'N', name: 'NO' }];

  public businessUnits: Lov[] = [] as Lov[];
  public branches: Lov[] = [] as Lov[];
  public receiptMethods: Lov[] = [] as Lov[];
  public loading = false;
  public listId = new Array();

  public manageGlobalDffDialog: boolean = false;
  public receiptDialog: boolean = false;
  public deleteDialog: boolean = false;
  public disabledExport: boolean = true;
  public ref?: DynamicDialogRef;
  public selectedCity!: Lov;
  public formSearch!: FormGroup;

  public startAddMaxDate!: Date;
  public endAddMinDate!: Date;
  public startDateDefault!: Date;
  public endDateDefault!: Date;

  public isBatchDelete = false;
  public paging!: Paging;
  public isUpdate = false;
  public isDownload = false;

  private readonly timeZone = 'UTC';

  public constructor(
    private service: R0003Service
    , private messageService: MessageService
    , public dialogService: DialogService
    , private formBuilder: FormBuilder
  ) {
    this.formSearch = this.formBuilder.group({
      branchId: new FormControl({ value: null, disabled: false }),
      buId: new FormControl({ value: null, disabled: false }, [Validators.required]),
      dateStartEnd: new FormControl({ value: '', disabled: false }),
      enabledFlag: new FormControl({ value: 'Y', disabled: false }),
    });

    this.formSave = this.formBuilder.group({
      branchId: new FormControl({ value: null, disabled: false }, [Validators.required]),
      buId: new FormControl({ value: null, disabled: false }, [Validators.required]),
      receiptMethodCode: new FormControl({ value: null, disabled: false }, [Validators.required]),

      startDate: new FormControl({ value: null, disabled: false }, [Validators.required]),
      endDate: new FormControl({ value: null, disabled: false }, [Validators.required]),
      prefixCode: new FormControl({ value: null, disabled: false }, [Validators.required]),

      runningNumber: new FormControl({ value: null, disabled: false }, [Validators.required]),
      initialValue: new FormControl({ value: null, disabled: false }, [Validators.required]),
      enabledFlag: new FormControl({ value: null, disabled: false }, [Validators.required]),


      runningId: new FormControl({ value: null, disabled: false })
    })

    this.isRowSelectable = this.isRowSelectable.bind(this);

  }

  public ngOnInit(): void {

    this.paging = {
      page: 1,
      pageSize: 10,
      totalRow: 0,
      totalAll: 0,
      totalPage: 0,
      sortField: null,
      sortType: null,
      startRow: 0
    };


    this.getMasterSelector();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    if (this.ref) {
      this.ref.close();
    }
  }

  public onSearch(): void {
    this.getData(true);
  }

  public openNew(): void {
    this.formSave.reset();
    this.formSave.controls.branchId.enable();
    this.formSave.controls.buId.enable();
    this.formSave.controls.receiptMethodCode.enable();
    this.formSave.controls.startDate.enable();
    this.formSave.controls.endDate.enable();
    this.formSave.controls.prefixCode.enable();
    this.formSave.controls.runningNumber.enable();
    this.formSave.controls.initialValue.enable();
    this.formSave.controls.enabledFlag.setValue('Y')
    this.submitted = false;
    this.isUpdate = false;
    this.receiptDialog = true;
  }

  public deleteSelected(): void {
    this.deleteDialog = true;
    this.isBatchDelete = true;
  }

  public confirmDeleteSelected(): void {
    this.deleteDialog = false;
    this.isBatchDelete = false;
    this.selectedInformation.map((item, idx) => {
      this.listId.push(item.runningId)
    });

    if (this.listId.length > 0) {
      //TODO Loading mask
      this.service.deleteReceiptNumberRunning(this.listId).pipe(takeUntil(this.destroy$)).subscribe((res: Receipt) => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: res.header?.desc,
            life: 3000,
          });
          this.selectedInformation = [];
          this.listId = [];
          this.getData(false);
        }

      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.isNotEmpty(error?.error?.header?.desc) ? error.error.header.desc : error.error });
      });
    }
  }

  public hideReceivableDialog(): void {
    this.receiptDialog = false;
    this.submitted = false;
  }

  public onUploadDialog(): void {
    this.ref = this.dialogService.open(UploadComponent, {
      header: 'Upload File',
      width: '70%',
      contentStyle: { 'max-height': '800px', overflow: 'auto', 'padding-bottom': '0' },
      baseZIndex: 10000,
    });
  }

  public exportCSV(): void {
    this.service.downloadReceiptNumberRunning(this.setDataToApi());
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Complete',
      life: 3000,
    });
  }

  public onEditReceivable(data: Data): void {
    this.formSave.patchValue(data);
    if (this.formSave.controls.startDate.value) {
      this.formSave.controls.startDate.setValue(new Date(this.formSave.controls.startDate.value));
    }
    if (this.formSave.controls.endDate.value) {
      this.formSave.controls.endDate.setValue(new Date(this.formSave.controls.endDate.value));
    }
    this.formSave.controls.buId.setValue(this.formSave.controls.buId.value.toString());
    this.formSave.controls.branchId.setValue(this.formSave.controls.branchId.value.toString());
    this.submitted = false;
    this.isUpdate = true;
    this.receiptDialog = true;
    if (data.isEdit) {
      this.formSave.controls.branchId.enable();
      this.formSave.controls.buId.enable();
      this.formSave.controls.receiptMethodCode.enable();
      this.formSave.controls.startDate.enable();
      this.formSave.controls.endDate.enable();
      this.formSave.controls.prefixCode.enable();
      this.formSave.controls.runningNumber.enable();
      this.formSave.controls.initialValue.enable();
    } else {
      this.formSave.controls.branchId.disable();
      this.formSave.controls.buId.disable();
      this.formSave.controls.receiptMethodCode.disable();
      this.formSave.controls.startDate.disable();
      this.formSave.controls.endDate.disable();
      this.formSave.controls.prefixCode.disable();
      this.formSave.controls.runningNumber.disable();
      this.formSave.controls.initialValue.disable();
    }
  }

  public deleteRow(data: Data): void {
    this.deleteRowData = { ...data };
    this.deleteDialog = true;
    this.isBatchDelete = false;
  }

  public confirmDeleteRow(): void {
    this.deleteDialog = false;
    this.isBatchDelete = false;
    //TODO Loading mask
    this.service.deleteReceiptNumberRunning([this.deleteRowData.runningId]).pipe(takeUntil(this.destroy$)).subscribe((res: Receipt) => {
      this.deleteRowData = {} as Data;
      if (res) {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Receivable Created',
          life: 3000,
        });
        this.selectedInformation = [];
        this.listId = [];
        this.getData(false);
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.isNotEmpty(error?.error?.header?.desc) ? error.error.header.desc : error.error });
    });
  }

  public getData(isDisplayMessage: boolean): void {
    //TODO Loading mask
    this.selectedInformation = [] as Data[];
    this.service.getData(this.setDataToApi(), this.paging.page, this.paging.pageSize).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Receipt>) => {
      if (res.status == 200) {
        this.disabledExport = false;
        this.informations = res?.body?.data ? res?.body?.data : [];
        console.log('=> ', this.informations);
        this.paging.totalAll = res?.body?.paging?.totalAll ? res?.body?.paging?.totalAll : 0;
        if (res?.body?.header?.code && isDisplayMessage) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: res?.body?.header?.desc,
            life: 3000,
          });
        }
      } else if (isDisplayMessage) {
        this.disabledExport = true;
        this.informations = [];
        this.paging.totalAll = 0;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No record found',
          life: 3000,
        });
      } else {
        this.disabledExport = true;
        this.informations = [];
        this.paging.totalAll = 0;
      }
    }, error => {
      this.disabledExport = true;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.isNotEmpty(error?.error?.header?.desc) ? error.error.header.desc : error.error });
    });
  }

  public onSaveReceivableDialog(): void {
    this.submitted = true;
    if (this.formSave.valid) {
      if (this.isUpdate) {
        let id: number = Number(this.formSave.controls.runningId.value);
        //TODO Loading mask
        this.service.updateReceiptNumberRunning(id, this.formSave.value).pipe(takeUntil(this.destroy$)).subscribe((res: Receipt) => {
          if (res.header?.code == '5000') {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.header?.desc,
              life: 3000,
            });
          } else if (res.header?.code) {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Successful',
              life: 3000,
            });
            this.receiptDialog = false;
            this.formSave.reset();
            this.getData(false);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Validate Fail',
              life: 3000,
            });
          }
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.isNotEmpty(error?.error?.header?.desc) ? error.error.header.desc : error.error });
        });
      } else {
        //TODO Loading mask
        this.service.postCreateReceiptNumberRunning(this.formSave.value).pipe(takeUntil(this.destroy$)).subscribe((res: Receipt) => {
          if (res.header?.code == '5000') {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.header?.desc,
              life: 3000,
            });
          } else if (res.header?.code) {
            this.receiptDialog = false;
            this.formSave.reset();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Successful',
              life: 3000,
            });
          }
          this.getData(false);
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.isNotEmpty(error?.error?.header?.desc) ? error.error.header.desc : error.error });
        });
      }
    }
  }

  public getMasterSelector(): void {
    this.service.getBusinessUnit().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<LovPage>) => {
      if (res.status == 200) {
        if (res?.body?.data) {
          this.businessUnits = res.body.data;
          this.formSearch.controls.buId.setValue(res.body.data[0].code);
        } else {
          this.businessUnits = [] as Lov[];
          this.formSearch.controls.buId.setValue(null);
        }
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.isNotEmpty(error?.error?.header?.desc) ? error.error.header.desc : error.error });
    });

    this.service.getBranch().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<LovPage>) => {
      if (res.status == 200) {
        this.branches = res?.body?.data ? res.body.data : [] as Lov[];
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.isNotEmpty(error?.error?.header?.desc) ? error.error.header.desc : error.error });
    });

    this.service.getReceiptMethod().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<LovPage>) => {
      if (res.status == 200) {
        this.receiptMethods = res?.body?.data ? res.body.data : [] as Lov[];
      }
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.isNotEmpty(error?.error?.header?.desc) ? error.error.header.desc : error.error });
    });
  }

  public onPageChange(e: any): void {
    this.paging.pageSize = e.rows;
    this.paging.page = e.page + 1;
    this.getData(false);
  }

  public onChangeAddStartDate(e: any): void {
    this.endAddMinDate = e;
  }

  public onChangeAddEndDate(e: any): void {
    this.startAddMaxDate = e;
  }

  public isNotEmpty(value: any): boolean {
    return !(value === '' || value === null || value === undefined);
  }

  public setDataToApi(): any {
    let dataParam = {
      branchId: this.formSearch.controls.branchId.value == null ? '' : this.formSearch.controls.branchId.value.code,
      buId: this.formSearch.controls.buId.value == null ? '' : this.formSearch.controls.buId.value.code,
      startDate: '',
      endDate: '',
      enabledFlag: this.formSearch.controls.enabledFlag.value ? this.formSearch.controls.enabledFlag.value : '',
    }
    if (this.formSearch.controls.dateStartEnd.value) {
      let startDate = this.formSearch.controls.dateStartEnd.value[0];
      let endDate = this.formSearch.controls.dateStartEnd.value[1];
      if (typeof (startDate) !== 'string') {
        dataParam.startDate = startDate.toISOString();
      }
      if (endDate) {
        if (typeof (endDate) !== 'string') {
          dataParam.endDate = endDate.toISOString();
        }
      }
    }
    return dataParam;
  }

  public onDownloadTemplate(): void { }

  public onClear(): void {
    this.formSearch.reset();
    this.formSearch.controls.buId.setValue(this.branches[0].code);
    this.informations = [] as Data[];
    this.disabledExport = true;
  }

  public isRowSelectable(event: any): boolean {
    return this.isDisabled(event.data);
  }

  public isDisabled(data: any): boolean {
    return data.isEdit;
  }
}
