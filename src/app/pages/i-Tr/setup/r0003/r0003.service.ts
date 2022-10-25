import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, Receipt, ReceiptUpload, Lov, ReceiptUploadHeader, LovPage, ReceiptUploadSave } from './receipt'
import { ENV } from 'src/app/core/service/http-center.service';
import { map } from "rxjs/operators";
import { Utils } from 'src/app/core/utility/utils';

const httpOptions = {
  observe: 'response' as 'response',
  params: new HttpParams(),
};
@Injectable()
export class R0003Service {
  public constructor(private http: HttpClient) { }

  public getData(param: any, pageNo: number, pageSize: number): Observable<HttpResponse<Receipt>> {
    httpOptions.params = new HttpParams()
      .set('pageParam', pageNo)
      .set('limitParam', pageSize)
      .set('buId', param.buId)
      .set('branchId', param.branchId)
      .set('startDate', param.startDate)
      .set('endDate', param.endDate)
      .set('enabledFlag', param.enabledFlag);
    return this.http.get<Receipt>(`${ENV.ITR_SET_UP_URL}/search`, httpOptions);
  }

  public getBusinessUnit(): Observable<HttpResponse<LovPage>> {
    return this.http.get<LovPage>(`${ENV.MASTER_BUSINESS_UNIT_URL}/lov`, httpOptions);
  }
  public getBranch(): Observable<HttpResponse<LovPage>> {
    return this.http.get<LovPage>(`${ENV.MASTER_BRANCH_URL}/lov`, httpOptions);
  }

  public getReceiptMethod(): Observable<HttpResponse<LovPage>> {
    return this.http.get<LovPage>(`${ENV.MASTER_RECEIPT_METHOD_URL}/lov`, httpOptions);
  }
  public postCreateReceiptNumberRunning(data: Data): Observable<Receipt> {
    return this.http.post<any>(`${ENV.ITR_SET_UP_URL}/save`, data).pipe(map((affectRows: Receipt) => {
      return affectRows;
    }));
  }

  public deleteReceiptNumberRunning(data: any): Observable<Receipt> {
    return this.http.post<any>(`${ENV.ITR_SET_UP_URL}/delete`, data).pipe(map((affectRows: Receipt) => {
      return affectRows;
    }));
  }

  public updateReceiptNumberRunning(id: number, data: any): Observable<Receipt> {
    return this.http.post<any>(`${ENV.ITR_SET_UP_URL}/update/${id}`, data).pipe(map((affectRows: Receipt) => {
      return affectRows;
    }));
  }

  public downloadReceiptNumberRunning(data: any): void {
    window.location.href = `${ENV.ITR_SET_UP_URL}/download?${Utils.toQueryString(data)}`;
  }

  public uploadReceiptNumberRunning(fileUpload: any): Observable<ReceiptUploadSave> {
    const uploadForm: FormData = new FormData();
    uploadForm.append('file', fileUpload);
    return this.http.post<any>(`${ENV.ITR_SET_UP_URL}/upload`, uploadForm).pipe(
      map((affectRows: ReceiptUploadSave) => {
        return affectRows;
      })
    );

  }
  public searchUploadDetailsReceiptNumberRunning(id: number, pageNo: number, pageSize: number): Observable<HttpResponse<ReceiptUpload>> {
    httpOptions.params = new HttpParams()
      .set('id', id)
      .set('pageParam', pageNo)
      .set('limitParam', pageSize);
    return this.http.get<ReceiptUpload>(`${ENV.ITR_SET_UP_URL}/searchUpload`, httpOptions);
  }

  saveUploadDetailsReceiptNumberRunning(id: number): Observable<ReceiptUpload> {
    return this.http.get<any>(`${ENV.ITR_SET_UP_URL}/saveUpload/${id}`).pipe(
      map((affectRows: ReceiptUpload) => {
        return affectRows;
      })
    );
  }

  downloadUploadDetailsReceiptNumberRunning(id: number): void {
    window.location.href = `${ENV.ITR_SET_UP_URL}/downloadZip/${id}`;
  }
}
