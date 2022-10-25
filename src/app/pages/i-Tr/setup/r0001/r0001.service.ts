import { Observable } from 'rxjs';
import { HttpClient, HttpParams,HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receivable, ReceivableData,DataLov ,ReceivableUpload} from './receivable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ENV } from 'src/app/core/service/http-center.service';
import { Utils } from 'src/app/core/utility/utils';
const httpOptions = {
  observe: 'response' as 'response',
  params: new HttpParams(),
};
@Injectable()
export class R0001Service {

  readonly mdsUrl = `${environment.apiMdsServerURL}`;
  readonly itrUrl = `${environment.apiItrSetupServiceURL}`;

  endpoint = {
    getBusinessUnit: this.mdsUrl + 'bu/lov',
    getBranch: this.mdsUrl + 'iappCmnBranch/lov',
    getReceivableActivity: this.mdsUrl + 'recActivity/lov',
    getReceiptType: this.mdsUrl + 'fndLookups/lov',
    
    searchItrReceivableOption: this.itrUrl + '/api/v1/receivableOption/search',
    saveItrReceivableOption: this.itrUrl + '/api/v1/receivableOption/save',
    editItrReceivableOption: this.itrUrl + '/api/v1/receivableOption/update',
    editItrReceivableOptionManageGlobalDff: this.itrUrl + '/api/v1/receivableOption/updateManageGlobalDff',

    downloadFileItrReceivableOption: this.itrUrl + '/api/v1/receivableOption/download',
    uploadFileItrReceivableOption: this.itrUrl + '/api/v1/receivableOption/upload',
    searchUploadDetailsItrReceivableOption: this.itrUrl + '/api/v1/receivableOption/searchUpload',
    saveUploadDetailsItrReceivableOption: this.itrUrl + '/api/v1/receivableOption/saveUpload',
    downloadZipItrReceivableOption: this.itrUrl + '/api/v1/receivableOption/downloadZip'
  }

  constructor(private http: HttpClient) { }

  getReceivableOption(param: any, pageNo: number, pageSize: number): Observable<ReceivableData> {
    const params = new HttpParams()
      .set('pageParam', pageNo)
      .set('limitParam', pageSize)
      .set('buId', param.buId)
      .set('branchId', param.branchId)
      .set('enabledFlag', param.enabledFlag);
    return this.http.get<any>(this.endpoint.searchItrReceivableOption, { params }).pipe(
      map((affectRows: any) => {
        return affectRows;
      })
    );
  }

  downloadFileItrReceivableOption(data: any) {
    window.location.href = `${this.endpoint.downloadFileItrReceivableOption}?buId=${data.buId}&branchId=${data.branchId}&enabledFlag=${data.enabledFlag}`;
  }

  saveReceivable(data: any): Observable<ReceivableData> {
    return this.http.post<any>(this.endpoint.saveItrReceivableOption, data).pipe(
      map((affectRows: any) => {
        return affectRows
      })
    );
  }


  updateManageGlobalDff(id: number, data: any): Observable<ReceivableData> {
    return this.http.post<any>(this.endpoint.editItrReceivableOptionManageGlobalDff + `/${id}`, data).pipe(
      map((affectRows: any) => {
        return affectRows
      })
    );
  }

  getBusinessUnit(): Observable<DataLov> {
    return this.http.get<any>(this.endpoint.getBusinessUnit).pipe(
      map((affectRows: DataLov) => {
        return affectRows;
      })
    );
  }

  getBranch(): Observable<DataLov> {
    return this.http.get<any>(this.endpoint.getBranch).pipe(
      map((affectRows: DataLov) => {
        return affectRows;
      })
    );
  }

  getReceiptType(): Observable<HttpResponse<DataLov>> {
    // return this.http.get<any>('assets/mockdata/receiptType.json');
    httpOptions.params = new HttpParams()
      .set('lovQuery', 'xdbFndLookupsMstKey.lookupType=PAYMENT_CATEGORY_TYPE')
      return this.http.get<DataLov>(this.endpoint.getReceiptType, httpOptions);
  }

  getReceivableActivity(): Observable<DataLov> {
    return this.http.get<any>(this.endpoint.getReceivableActivity).pipe(
      map((affectRows: DataLov) => {
        return affectRows;
      })
    );
  }

  getAttribute(): Observable<any> {
    return this.http.get<any>('assets/mockdata/attribute.json');
  }

  uploadFileItrReceivableOption(fileUpload: any) {
    const uploadForm: FormData = new FormData();
    uploadForm.append('file', fileUpload)
    return this.http.post<any>(this.endpoint.uploadFileItrReceivableOption, uploadForm).pipe(
      map((affectRows: any) => {
        return affectRows;
      })
    );
  }

  searchUploadDetailsItrReceivableOption(id: number, pageNo: number, pageSize: number): Observable<ReceivableUpload>  {
   const params = new HttpParams()
      .set('id', id)
      .set('page', pageNo)
      .set('limit', pageSize);
    return this.http.get<any>(this.endpoint.searchUploadDetailsItrReceivableOption, { params }).pipe(
      map((affectRows: ReceivableUpload) => {
        return affectRows;
      })
    );
  }

  saveUploadDetailsItrReceivableOption(id: number): Observable<ReceivableUpload> {
    return this.http.get<any>(this.endpoint.saveUploadDetailsItrReceivableOption + `/${id}`).pipe(
      map((affectRows: ReceivableUpload) => {
        return affectRows;
      })
    );
  }

  downloadZipItrReceivableOption(id: number) {
    window.location.href = `${this.endpoint.downloadZipItrReceivableOption}/${id}`;
  }
}
