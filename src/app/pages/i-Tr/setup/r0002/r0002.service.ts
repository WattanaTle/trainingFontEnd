import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Receipt, ReceiptUpload, LovPage, ReceiptUploadSave } from './receipt';
import { Utils } from 'src/app/core/utility/utils';


const httpOptions = {
  observe: 'response' as 'response',
  params: new HttpParams(),
};
@Injectable()
export class R0002Service {

  public readonly mdsUrl = `${environment.apiMdsServerURL}`;
  public readonly itrUrl = `${environment.apiItrSetupServiceURL}`;

  public endpoint = {
    findAllBusinessUnit: this.mdsUrl + 'bu/lov',
    findAllBranch: this.mdsUrl + 'iappCmnBranch/lov',
    findAllItrConfirmationNumberRunning: this.itrUrl + '/api/v1/receiptConfirmationRunningNumber/findAll',
    searchItrConfirmationNumberRunning: this.itrUrl + '/api/v1/receiptConfirmationRunningNumber/search',
    saveItrConfirmationNumberRunning: this.itrUrl + '/api/v1/receiptConfirmationRunningNumber',
    editItrConfirmationNumberRunning: this.itrUrl + '/api/v1/receiptConfirmationRunningNumber/update',
    deleteItrConfirmationNumberRunning: this.itrUrl + '/api/v1/receiptConfirmationRunningNumber/delete',
    downloadItrConfirmationNumberRunning: this.itrUrl + '/api/v1/receiptConfirmationRunningNumber/download',
    findAllItrConfirmationNumberRunningUpload: this.itrUrl + '/api/v1/receiptConfirmationRunningNumber/findAllUpload',
    uploadFileItrConfirmationNumberRunning: this.itrUrl + '/api/v1/receiptConfirmationRunningNumber/upload',
    searchUploadDetailsItrConfirmationNumberRunning: this.itrUrl + '/api/v1/receiptConfirmationRunningNumber/searchUpload',
    saveUploadDetailsItrConfirmationNumberRunning: this.itrUrl + '/api/v1/receiptConfirmationRunningNumber/saveUpload',
    downloadZipItrConfirmationNumberRunning: this.itrUrl + '/api/v1/receiptConfirmationRunningNumber/downloadZip'
  }

  public constructor(private http: HttpClient) { }

  public findAllBusinessUnit(): Observable<HttpResponse<LovPage>> {
    return this.http.get<LovPage>(this.endpoint.findAllBusinessUnit, httpOptions);
    // return this.http.get<any>(this.endpoint.findAllBusinessUnit).pipe(
    //   map((affectRows: LovPage) => {
    //     return affectRows;
    //   })
    // );
  }

  public findAllBranch(): Observable<HttpResponse<LovPage>> {
    return this.http.get<LovPage>(this.endpoint.findAllBranch, httpOptions);
    // return this.http.get<any>(this.endpoint.findAllBranch).pipe(
    //   map((affectRows: LovPage) => {
    //     return affectRows;
    //   })
    // );
  }


  public searchItrConfirmationNumberRunning(param: any, pageNo: number, pageSize: number): Observable<HttpResponse<Receipt>> {
    httpOptions.params = new HttpParams()
      .set('pageParam', pageNo)
      .set('limitParam', pageSize)
      .set('buId', param.businessUnit)
      .set('branchId', param.branch)
      .set('dateFrom', param.dateFrom)
      .set('dateTo', param.dateTo)
      .set('enabledFlag', param.enable);
    return this.http.get<Receipt>(this.endpoint.searchItrConfirmationNumberRunning, httpOptions);
    // return this.http.get<any>(this.endpoint.searchItrConfirmationNumberRunning,  params ).pipe(
    //   map((affectRows: Receipt) => {
    //     return affectRows;
    //   })
    // );
  }

  public saveItrConfirmationNumberRunning(data: any): Observable<Receipt> {
    return this.http.post<any>(this.endpoint.saveItrConfirmationNumberRunning, data).pipe(
      map((affectRows: Receipt) => {
        return affectRows;
      })
    );
  }

  public editItrConfirmationNumberRunning(id: number, data: any): Observable<Receipt> {
    return this.http.post<any>(this.endpoint.editItrConfirmationNumberRunning + `/${id}`, data).pipe(
      map((affectRows: Receipt) => {
        return affectRows;
      })
    );
  }

  public deleteItrConfirmationNumberRunning(id: any): Observable<Receipt> {
    return this.http.post<any>(this.endpoint.deleteItrConfirmationNumberRunning, id).pipe(
      map((affectRows: Receipt) => {
        return affectRows;
      })
    );
  }

  public downloadItrConfirmationNumberRunning(data: any) {
    window.location.href = `${this.endpoint.downloadItrConfirmationNumberRunning}?${ Utils.toQueryString(data)}`;
    // window.location.href = `${this.endpoint.downloadItrConfirmationNumberRunning}?bu=${data.businessUnit}&branch=${data.branch}&dateFrom=${data.dateFrom}&dataTo=${data.dateTo}&enable=${data.enable}`;
  }

  public uploadFileItrConfirmationNumberRunning(fileUpload: any): Observable<ReceiptUploadSave> {
    const uploadForm: FormData = new FormData();
    uploadForm.append('file', fileUpload)
    return this.http.post<any>(this.endpoint.uploadFileItrConfirmationNumberRunning, uploadForm).pipe(
      map((affectRows: ReceiptUploadSave) => {
        return affectRows;
      })
    );
  }

  public searchUploadDetailsItrConfirmationNumberRunning(id: number, pageNo: number, pageSize: number): Observable<HttpResponse<ReceiptUpload>> {
    httpOptions.params = new HttpParams()
      .set('id', id)
      .set('pageParam', pageNo)
      .set('limitParam', pageSize);
    return this.http.get<ReceiptUpload>(this.endpoint.searchUploadDetailsItrConfirmationNumberRunning, httpOptions);
    // return this.http.get<any>(this.endpoint.searchUploadDetailsItrConfirmationNumberRunning, { params }).pipe(
    //   map((affectRows: ReceiptUpload) => {
    //     return affectRows;
    //   })
    // );
  }

  public saveUploadDetailsItrConfirmationNumberRunning(id: number): Observable<ReceiptUpload> {
    return this.http.get<any>(this.endpoint.saveUploadDetailsItrConfirmationNumberRunning + `/${id}`).pipe(
      map((affectRows: ReceiptUpload) => {
        return affectRows;
      })
    );
  }

  public downloadZipItrConfirmationNumberRunning(id: number) {
    window.location.href = `${this.endpoint.downloadZipItrConfirmationNumberRunning}/${id}`;
  }

}
