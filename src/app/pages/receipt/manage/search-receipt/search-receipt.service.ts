import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer, LOV, lovPage, ResponsePageSearch } from './search-receipt';

@Injectable({
  providedIn: 'root'
})
export class SearchReceiptService {

  readonly mdsUrl = `${environment.apiMdsServerURL}`;
  // readonly itrUrl = `${environment.apiItrServiceURL}`;
  readonly receiptServiceUrl = `${environment.apiItrServiceURL}`;

  endpoint = {
    findAllBusinessUnit: this.mdsUrl + 'bu/lov',
    findAllBranch: this.mdsUrl + 'iappCmnBranch/lov',
    findCustomer: this.receiptServiceUrl + '/api/v1/receipt/findCustomer',
    findReceipt: this.receiptServiceUrl + '/api/v1/receipt/manage/search',
    findReceiptByReceiptNumber: this.receiptServiceUrl + '/api/v1/receipt/manage/searchReceiptNumber'
  }

  constructor(private http: HttpClient) { }

  findAllBusinessUnit(): Observable<lovPage> {
    return this.http.get<any>(this.endpoint.findAllBusinessUnit).pipe(
      map((affectRows: lovPage) => {
        return affectRows;
      })
    );
  }

  findAllBranch(): Observable<lovPage> {
    return this.http.get<any>(this.endpoint.findAllBranch).pipe(
      map((affectRows: lovPage) => {
        return affectRows;
      })
    );
  }

  findCustomer(): Observable<Customer[]> {
    return this.http.get<any>(this.endpoint.findCustomer).pipe(
      map((affectRows: Customer[]) => {
        return affectRows;
      })
    );
  }

  findBankName(): Observable<LOV[]> {
    return this.http.get<any>('/assets/mockdata/back-name.json');
  }

  findReceipt(data: any, pageNo: number, pageSize: number): Observable<ResponsePageSearch> {
    const params = new HttpParams()
      .set('buId', data.businessUnit || "" )
      .set('branchId', data.branch || "")
      .set('pageParam', pageNo || "")
      .set('limitParam', pageSize || "")
      .set('receiptNumber', data.receiptNumber || "")
      .set('bankName', data.bankName || "")
      .set('customerName', data.customerName || "")
      .set('customerSite', data.site || "");
    return this.http.get<any>(this.endpoint.findReceipt, { params }).pipe(
      map((affectRows: ResponsePageSearch) => {
        return affectRows;
      })
    );
  }

  findReceiptByReceiptNumber(data: any): Observable<ResponsePageSearch> {
    const params = new HttpParams()
      .set('receiptNumber', data);
    return this.http.get<any>(this.endpoint.findReceiptByReceiptNumber, { params }).pipe(
      map((affectRows: ResponsePageSearch) => {
        return affectRows;
      })
    );
  }

}
