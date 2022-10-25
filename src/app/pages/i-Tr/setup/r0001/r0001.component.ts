import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { R0001Service } from './r0001.service';
import { Receivable, ManageGlobalDff, Lov } from './receivable';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UploadDialogR0001Component } from './upload-dialog-r0001/upload-dialog-r0001.component';
import * as FileSaver from 'file-saver';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Paging } from 'src/app/models/paging';


@Component({
  selector: 'app-r0001',
  templateUrl: './r0001.component.html',
  styleUrls: ['./r0001.component.scss'],
})
export class R0001Component implements OnInit, OnDestroy {
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public informations: Receivable[] = [];
  public formDetail!: FormGroup;
  public manageDFF!: ManageGlobalDff;
  public selectedInfomation!: Receivable[];
  public submitted: boolean = false;
  public cols: any[] = [];
  public loading = false;
  //mock
  public cities!: Lov[];
  public businessUnits!: Lov[];
  public branches!: Lov[];
  public receiptTypes!: Lov[];
  public receivableActivitys!: Lov[];
  public attributes!: Lov[];
  public receiptActions!: Lov[];

  //TODO change to user
  // private readonly fixBranchId = '300000001693555';

  public enableToggle = [
    { name: 'YES', code: 'Y' },
    { name: 'NO', code: 'N' }
  ];
  public applyToggle = [
    { name: 'YES', code: 'Y' },
    { name: 'NO', code: 'N' }
  ];
  public test: string = '';
  public apply: string = '';
  public paging!: Paging;
  public isUpdate = false;
  public isDownload = false;
  //dialog display
  public manageGlobalDffDialog: boolean = false;
  public receivableDialog: boolean = false;
  public deleteDialog: boolean = false;
  public disabledExport: boolean = true;
  public editReceivableDialog: boolean = false;
  public isDimReceivableActivity: boolean = true;
  public isDimApplyPremiumFlag: boolean = false;
  public ref?: DynamicDialogRef;
  public selectedCity!: Lov;
  public formSearch!: FormGroup;



  constructor(
    private service: R0001Service,
    private messageService: MessageService,
    public dialogService: DialogService
  ) { }

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
    this.cols = [
      { field: 'businessUnit', header: 'businessUnit' },
      { field: 'receivableOption', header: 'receivableOption' },
      { field: 'receiptType', header: 'receiptType' },
      { field: 'receivableActivity', header: 'receivableActivity' },
      { field: 'applyPremium', header: 'applyPremium' },
      { field: 'receiptAction', header: 'receiptAction' },
      { field: 'enable', header: 'enable' },
    ];
    this.formSearch = new FormGroup({
      buId: new FormControl({ value: null, disabled: false }, [Validators.required]),
      branchId: new FormControl({ value: null, disabled: false }),
      enabledFlag: new FormControl({ value: "Y", disabled: false }),
    });

    this.formDetail = new FormGroup({
      buId: new FormControl({ value: null, disabled: false }, [Validators.required]),
      branchId: new FormControl({ value: null, disabled: false }),
      receivableOptionName: new FormControl({ value: null, disabled: false }, [Validators.required]),
      receiptTypeId: new FormControl({ value: null, disabled: false }, [Validators.required]),
      receivableActivityId: new FormControl({ value: null, disabled: false }),
      applyPremiumFlag: new FormControl({ value: null, disabled: false }),
      receiptActionTypeId: new FormControl({ value: null, disabled: false }, [Validators.required]),
      enabledFlag: new FormControl({ value: null, disabled: false }, [Validators.required]),
      actionType: new FormControl({ value: null, disabled: false }, [Validators.required]),
      optionId: new FormControl({ value: null, disabled: false }),
      attribute1: new FormControl({ value: null, disabled: false }, [Validators.required]),
      attribute2: new FormControl({ value: null, disabled: false }, [Validators.required]),
      attribute3: new FormControl({ value: null, disabled: false }, [Validators.required]),
      attribute4: new FormControl({ value: null, disabled: false }, [Validators.required]),
      attribute5: new FormControl({ value: null, disabled: false }, [Validators.required]),
      attribute6: new FormControl({ value: null, disabled: false }, [Validators.required]),
      attribute7: new FormControl({ value: null, disabled: false }, [Validators.required]),
      attribute8: new FormControl({ value: null, disabled: false }, [Validators.required]),
      attribute9: new FormControl({ value: null, disabled: false }, [Validators.required]),
      attribute10: new FormControl({ value: null, disabled: false }, [Validators.required]),
      attribute11: new FormControl({ value: null, disabled: false }, [Validators.required]),
    })
    this.isRowSelectable = this.isRowSelectable.bind(this);

    this.getMasterSelector();
  }



  public getMasterSelector(): void {
    this.service.getBusinessUnit().subscribe(res => {
      this.businessUnits = res.data;
      this.formSearch.controls.buId.setValue(res.data[0].code);
    })
    this.service.getBranch().subscribe(res => {
      this.branches = res.data;
      this.formSearch.controls.branchId.setValue(res.data[0].code);
    })
    this.service.getReceiptType().subscribe(res => {
      this.receiptTypes = res?.body?.data ? res.body.data : [] as Lov[];
    })
    this.service.getReceivableActivity().subscribe(res => {
      this.receivableActivitys = res.data;
    })
    this.service.getAttribute().subscribe(res => {
      this.attributes = res;
    })


  }

  public onPageChange(e: any): void {
    console.log(e);
    this.paging.pageSize = e.rows;
    this.paging.page = e.page + 1;
    this.getData(false);
  }

  public openNew(): void {
    this.formDetail.reset();
    this.formDetail.patchValue({
      enabledFlag: 'YES',
      applyPremiumFlag: 'YES'
    });
    this.submitted = false;
    this.isUpdate = false;
    this.receivableDialog = true;

  }

  public deleteSelected(): void {
    this.deleteDialog = true;
  }

  public confirmDeleteSelected(): void {
    this.deleteDialog = false;
    this.informations = this.informations.filter((val) => !this.selectedInfomation.includes(val));
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: ' Deleted Success',
      life: 3000,
    });
    this.selectedInfomation = [];
  }



  public hideReceivableDialog(): void {
    this.receivableDialog = false;
    this.submitted = false;
  }





  public onSaveReceivableDialog(): void {
    this.submitted = true;
    this.formDetail.controls.actionType.setValue('MANUAL')
    // this.formDetail.controls.branchId.setValue(this.fixBranchId)
    if (this.formDetail.valid) {
      this.service.saveReceivable(this.formDetail.value).subscribe(
        res => {
          if (res.header.desc === 'Success') {
            this.receivableDialog = false;
            this.formDetail.reset();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Complete',
              life: 3000,
            });
            this.getData(false);
          } else {
            this.messageService.add({
              severity: 'warn',
              summary: 'Warning !',
              detail: res.header?.desc,
              life: 3000,

            });
          }
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
        });
    }
  }
  public updateManageGlobalDff(): void {
    let id: number = Number(this.manageDFF.optionId);
    this.service.updateManageGlobalDff(id, this.manageDFF)
      .subscribe(res => {
        console.log("res", res);

        this.manageGlobalDffDialog = false;
        this.formDetail.reset()
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: res.header?.desc,
          life: 3000,
        });

        this.getData(false);
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
      });
  }

  public editManageGlobalDff(data: ManageGlobalDff): void {

    this.manageDFF = { ...data };
    this.manageGlobalDffDialog = true;
  }

  public getData(isDisplayMessage: boolean): void {

    let searchParam = {
      buId: this.formSearch.controls.buId.value == null ? '' : this.formSearch.controls.buId.value,
      branchId: this.formSearch.controls.branchId.value == null ? '' : this.formSearch.controls.branchId.value,
      enabledFlag: this.formSearch.controls.enabledFlag.value == null ? '' : this.formSearch.controls.enabledFlag.value,
      page: this.paging.page,
      limit: this.paging.pageSize
    }
    this.service.getReceivableOption(searchParam, this.paging.page, this.paging.pageSize).subscribe(res => {
      if (res) {
        if (isDisplayMessage) {
          this.messageService.add({
            severity: 'success',
            summary: 'Search Successful',
            detail: 'Complete',
            life: 3000,
          });
        }
        this.disabledExport = false;
        this.informations = res.data ? res.data : [];
        this.paging.totalAll = res.paging?.totalAll ? res.paging?.totalAll : 0;


      } else {
        if (isDisplayMessage) {

          this.messageService.add({
            severity: 'error',
            summary: 'Error !',
            detail: 'No record found',
            life: 3000,
          });
        }
        this.disabledExport = true;

      }
    },
      error => {
        this.disabledExport = true;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
      });


  }

  public onSearch(): void {
    this.getData(true);
  }

  public onEditReceivable(data: Receivable): void {
    this.formDetail.patchValue(data);
    this.formDetail.controls.buId.setValue(this.formDetail.controls.buId.value.toString());
    this.formDetail.controls.receiptTypeId.setValue(this.formDetail.controls.receiptTypeId.value);
   
    if(this.formDetail.controls.receivableActivityId.value != null){
      this.formDetail.controls.receivableActivityId.setValue(this.formDetail.controls.receivableActivityId.value.toString());
    }
    this.formDetail.controls.receiptActionTypeId.setValue(this.formDetail.controls.receiptActionTypeId.value);
    this.formDetail.controls.enabledFlag.setValue(this.formDetail.controls.enabledFlag.value);
    this.formDetail.controls.applyPremiumFlag.setValue(this.formDetail.controls.applyPremiumFlag.value);
    this.submitted = false;
    this.isUpdate = true;
    this.receivableDialog = true;
    const event = { value: this.formDetail.controls.receiptTypeId.value };

    this.seleteReceiptType(event);
  }



  public exportCSV(): void {
    let param = {
      buId: this.formSearch.controls.buId.value == null ? '' : this.formSearch.controls.buId.value,
      branchId: this.formSearch.controls.branchId.value == null ? '' : this.formSearch.controls.branchId.value,
      enabledFlag: this.formSearch.controls.enabledFlag.value == null ? '' : this.formSearch.controls.enabledFlag.value == 'NO' ? 'N' : 'Y',

    }

    if (param.buId != null) {
      this.service.downloadFileItrReceivableOption(param);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Complete',
        life: 3000,
      });

    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error !',
        detail: 'No record found',
        life: 3000,
      });
    }
  }

  public onUploadDiaglog(): void {
    this.ref = this.dialogService.open(UploadDialogR0001Component, {
      header: 'Upload File',
      width: '70%',
      contentStyle: { 'max-height': '800px', overflow: 'auto', 'padding-bottom': '0' },
      baseZIndex: 10000,
    });
  }

  public onDownloadTemplate(): void { }

  public ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
  public isEmpty(value: any): boolean {
    return value === '' || value === null || value === undefined;
  }

  public seleteReceiptType(event: any): void {
    if (event.value == 'CASH') {
      this.isDimReceivableActivity = true;
      this.isDimApplyPremiumFlag = false;
      this.formDetail.controls.receivableActivityId.reset();
      this.receiptActions = [
        { name: 'Refund', code: 'refund' },
        { name: 'Create Standard Receipt', code: 'standardReceipt' },
        { name: 'Create Write-Off', code: 'writeOff' }
      ]
    } else {
      this.isDimReceivableActivity = false;
      this.isDimApplyPremiumFlag = true;
      this.formDetail.controls.applyPremiumFlag.reset();
      this.receiptActions = [
        { name: 'Apply Prepayment', code: 'applyPrepayment' },
        { name: 'Return to E-Authorize', code: 'ReturnAuthorize' },
        { name: 'Zero Pay', code: 'zeroPay' },
        { name: 'Receipt Collection Contract', code: 'receiptCollectionContract' },
        { name: 'Create Miscellaneous Receipt', code: 'miscellaneousReceipt' },
        { name: 'Create Receipt, Create AP Invoice', code: 'receiptCreateInvoice' },
      ]
    }
  }

  public onClear(): void {
    this.formSearch.reset();
    this.formSearch.controls.buId.setValue(this.businessUnits[0].code);
    this.formSearch.controls.branchId.setValue(this.branches[0].code);
    this.informations = [] as Receivable[];
    this.disabledExport = true;
  }


  public isRowSelectable(event: any): boolean {
    return this.isDisabled(event.data);
  }

  public isDisabled(data: any): boolean {
    return data.enabledFlag === 'Y';
  }
}
