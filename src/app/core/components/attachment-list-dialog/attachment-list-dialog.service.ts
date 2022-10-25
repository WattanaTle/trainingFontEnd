import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
const httpOptions = {
  observe: 'response' as 'response',
  params: new HttpParams(),
};
@Injectable({
  providedIn: 'root'
})

export class AttachmentListDialogService {

  
  readonly storageUrl = `${environment.apiStorageUrl}`;

  endpoint = {
  
    download: this.storageUrl + ``,
 
    
   
  }

  constructor(private http: HttpClient) { }



 
  download(id: number): void {
    window.location.href = this.storageUrl + id +'/download';
  }



}

