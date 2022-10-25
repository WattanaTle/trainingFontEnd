
export interface LovPage {
  header: Header;
  data: Lov[];
}


export interface Receipt {
  header: Header;
  paging: Paging;
  data: Data[];
}

export interface ReceiptUpload {
  header: Header;
  paging: Paging;
  data: DataUpload[];
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

export interface Data {
  runningId: string;
  branchId: string;
  buId: string;
  prefixCode: string;
  receiptMethodCode: string;
  startDate: string | Date;
  endDate: string | Date;
  runningNumber: string;
  initialValue: string;
  enabledFlag: string;
  isEdit: boolean;
}

export interface DataUpload {
  runningId: string;
  businessUnit: string;
  branch: string;
  prefixCode: string;
  startDate: string | Date;
  endDate: string | Date;
  runningNumber: string;
  initialValue: string;
  enable: string;
  status: string;
}

export interface Lov {
  code: string;
  name: string;
}

export interface ReceiptUploadSave {
  header: Header;
  data: ReceiptUploadHeader;
}
export interface ReceiptUploadHeader {
  uploadFileId: number;
  moduleCode: string;
  customizeId: string;
  fileName: string;
  totalRecord: number;
  successRecord: number;
  errorRecord: number;
  message: string;
  status: string;
}
