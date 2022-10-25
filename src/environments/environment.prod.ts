const API_COMMON_URL = 'http://10.241.12.2/api/v1/mds-service'
const API_ITR_SETUP_URL = 'http://10.241.12.2/api/v1'
const API_ISTM_SETUP_URL = 'http://10.241.12.2/api/v1';
const SERVER_API_COMMON_URL = 'http://iapp-test.iapp.vfin/mds-service/api/v1/';

export const environment = {
  production: true,
  masterBranchUrl: `${API_COMMON_URL}/iappCmnBranch`,
  masterBusinessunitUrl: `${API_COMMON_URL}/bu`,
  masterReceiptmethodUrl: `${API_COMMON_URL}/arRecMethods`,

  itrUrl: `${API_ITR_SETUP_URL}/receiptNumberRunning`,

  apiCommonUrl: API_COMMON_URL,
  apiBuUrl: `${API_COMMON_URL}/bu`,
  apiChargeFeeUrl: `${API_ISTM_SETUP_URL}/chargeFee`,
  apiIappCmnBranchUrl: `${API_COMMON_URL}/iappCmnBranch`,

  apiMdsServerURL: SERVER_API_COMMON_URL,
  apiMdsServiceURL: "http://10.241.12.2",
  apiItrServiceURL: "http://10.241.12.2",
  apiItrAdvServiceURL: "http://10.241.12.2",
  apiItrSetupServiceURL: "http://10.241.12.2",
  testMds:`${API_COMMON_URL}/`,

  moduleId: 'all'
};