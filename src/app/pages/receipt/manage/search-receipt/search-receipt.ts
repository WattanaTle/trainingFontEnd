export interface LOV {
    name: string;
    code: string;
}


export interface lovPage {
  header: Header;
  data: LOV[];
}

export class Customer {
    customerNumber?: string;
    site?: string
    customerName?: string
}

export class ResponsePageSearch {
    header!: Header;
    paging!: Paging;
    data!: Response[];
}

export interface LovData {
    header: Header;
    data: LOV[];
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

export class Response {
    id?: number;
    version?: number;
    businessUnit?: number;
    branch?: number;
    receiptMethod?: number;
    receivableOption?: number;
    allowApplyPremium?: string;
    taxRateCode?: number;
    vatAmount?: number;
    deliveryReceiptNumber?: string;
    comment?: string;
    interfaced?: string;
    enteredAmount?: number;
    upappliedAmount?: number;
    unidentifiedAmount?: number;
    receiptNumber?: string;
    receiptDate?: string | Date;
    maturityDate?: string | Date;
    accountingDate?: string | Date;
    documentNumber?: string;
    customerNumber?: string;
    customerName?: string;
    site?: number;
    customerBranch?: string;
    codeCore?: string;
    bankName?: number;
    bankAccount?: number;
    bankBranch?: number;
    depositDate?: string | Date;
    amloStatus?: string;
    status?: string;
    splitReceipt?: string;
    attachment!: Attachment[];
}

export class Attachment {
    id?: number;
    realFileName?: string;
    fileName?: string;
    sequence?: number;
}
