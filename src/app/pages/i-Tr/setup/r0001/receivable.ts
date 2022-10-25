export class Receivable {
  optionId?: string;
  buId?: string;
  receivableOptionName?: string;
  receiptTypeId?: string;
  receivableActivityId?: string;
  applyPremiumFlag?: string;
  receiptActionTypeId?: string;
  enabledFlag?: string;
  actionType?: string;
  manageGlobalDff?: ManageGlobalDff[];
}

export interface ManageGlobalDff {
  optionId?: string;
  attribute1?: string;
  attribute2?: string;
  attribute3?: string;
  attribute4?: string;
  attribute5?: string;
  attribute6?: string;
  attribute7?: string;
  attribute8?: string;
  attribute9?: string;
  attribute10?: string;
  attribute11?: string;

}


export class DataUpload {
  optionId?: string;
  businessUnit?: string;
  receivableOption?: string;
  receiptType?: string;
  receivableActivity?: string;
  applyPremiumFlag?: string;
  receiptActionType?: string;
  enabled?: string;
  actionType?: string;
  manageGlobalDff?: ManageGlobalDff[];
}
export class ReceivableData {
  header!: Header;
  paging!: Paging;
  data!: Receivable[];
}

export class ReceivableUpload {
  header!: Header;
  paging!: Paging;
  data!: DataUpload[];
}

export interface Header {
  code: string;
  desc: string;
}

export interface Paging {
  page: number;
  pageSize: number;
  totalRow: number;
  totalAll: number;
  totalPage: number;
  sortField: any;
  sortType: any;
  startRow: number;
}
export class DataLov {
  header!: Header;
  data!: Lov[];
}
export interface Lov {
  name: string;
  code: string;
}


export class ReceivableUploadHeader {
  header?: Header;
  data?: DataUploadHeader;
}

export class DataUploadHeader {
  uploadFileId?: number;
  moduleCode?: string;
  customizeId?: string;
  fileName?: string;
  totalRecord?: number;
  successRecord?: number;
  errorRecord?: number;
  message?: string;
  status?: string;
}