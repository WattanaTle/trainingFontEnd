// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const API_COMMON_URL = 'http://localhost:8080/api/v1/mds-service';
const API_ITR_SETUP_URL = 'http://localhost:8083/api/v1';
const API_ISTM_SETUP_URL = 'http://localhost:8070/api/v1';
const API_COMMON_URL_SERVER = 'http://iapp-test.iapp.vfin/mds-service/';
const API_ITR_FEE_URL = 'http://localhost:8084/api/v1';
const API_TEST_COMMON = 'http://localhost:8080/';
const API_COLLECTION_CONTRACT_URL = 'http://localhost:8084/api/v1';
const API_ITR_SET_SERV_URL = 'http://localhost:8083/api/v1';
// const API_COLLECTION_CONTRACT_URL = 'http://localhost:8082/api/v1';
const API_IAPP_STORAGE_URL = 'http://iapp-test.iapp.vfin/storage-service/api/v1/';
const API_AMLO_URL = `http://localhost:8083/api/v1/commonUpload/CheckAmloReceipt`;
const API_STORAGE_URL = `http://iapp-test.iapp.vfin/storage-service/api/v1/`;

export const environment = {
  production: false,
  masterBranchUrl: `${API_COMMON_URL_SERVER}iappCmnBranch`,
  masterBusinessunitUrl: `${API_COMMON_URL_SERVER}bu`,
  masterReceiptmethodUrl: `${API_COMMON_URL_SERVER}arRecMethods`,

  itrUrl: `${API_ITR_SETUP_URL}/receiptRunningNumber`,

  apiCommonUrl: API_COMMON_URL,
  apiBuUrl: `${API_COMMON_URL}/bu`,
  apiChargeFeeUrl: `${API_ISTM_SETUP_URL}/chargeFee`,
  apiIappCmnBranchUrl: `${API_COMMON_URL}/iappCmnBranch`,
  apiItrUrl: `${API_ITR_SETUP_URL}`,
  apiCollectContractUrl: `${API_COLLECTION_CONTRACT_URL}`,
  apiItrSetupUrl: `${API_ITR_SET_SERV_URL}`,
  apiAmloUrl: `${API_AMLO_URL}`,
  apiStorageUrl: `${API_STORAGE_URL}`,

  apiMdsServerURL: API_COMMON_URL_SERVER,
  apiItrFeeServiec: API_ITR_FEE_URL,
  apiMdsServiceURL: "http://localhost:8080",
  apiItrServiceURL: "http://localhost:8081",
  apiItrAdvServiceURL: "http://localhost:8082",
  apiItrSetupServiceURL: "http://localhost:8083",
  apiItrCollectionContractServiceURL: "http://localhost:8084",
  // testMds: `${API_TEST_COMMON}`,
  apiIPayServiceURL: "http://localhost:8080",
  testMds:`${API_COMMON_URL}/`,
  apiIAppStorageServiceURL: API_IAPP_STORAGE_URL,
  apiIpaySetupPayment: "http://localhost:8082",

  moduleId: 'all'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
