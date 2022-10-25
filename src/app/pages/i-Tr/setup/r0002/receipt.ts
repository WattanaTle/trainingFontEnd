export interface Receipt {
  header: Header;
  paging: Paging;
  data: DataMst[];
}

export interface ReceiptUpload {
  header: Header;
  paging: Paging;
  data: DataMstUpload[];
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

export interface DataMst {
  runningId: string;
  businessUnit: string;
  branch: string;
  prefixCode: string;
  startDate: string | Date;
  endDate: string | Date;
  runningNumber: string;
  initialValue: string;
  enable: string;
  isEdit: boolean;
}

export interface DataMstUpload {
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
  message: string;
}
export interface LovPage {
  header: Header;
  data: Lov[];
}

export interface Lov {
  name: string;
  code: string;
}
