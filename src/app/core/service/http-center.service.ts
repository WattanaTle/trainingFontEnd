import {Injectable} from "@angular/core";

import { environment } from '@env/environment';

export const ENV = {
  ITR_SET_UP_URL: environment.itrUrl,
  MASTER_BRANCH_URL: environment.masterBranchUrl,
  MASTER_BUSINESS_UNIT_URL: environment.masterBusinessunitUrl,
  MASTER_RECEIPT_METHOD_URL: environment.masterReceiptmethodUrl,
}

@Injectable({
  providedIn: 'root'
})
export class HttpCenterService {

}
