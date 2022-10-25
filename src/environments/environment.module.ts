export const MENU_ITR: any = [
  {
    label: 'I-TR',
    items: [
      {
        label: 'Setup',
        icon: 'pi pi-fw pi-cog',
        items: [
          { label: 'Receivable Option', icon: 'pi pi-fw pi-angle-right', routerLink: ['/itr-setup/receivable-option'] },
          {
            label: 'Receipt Running Number',
            icon: 'pi pi-fw pi-angle-right',
            routerLink: ['/itr-setup/receipt-running'],
          },
          {
            label: 'Receipt Confirmation Running Number',
            icon: 'pi pi-fw pi-angle-right',
            routerLink: ['/itr-setup/receipt-confirmation'],
          },
        ],
      },
    ],
  },
];

export const MENU_IPAY: any = [
  {
    label: 'i-PAY',
    items: [
      {
        label: 'Set Up Master',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Payment Request Running Number',
            icon: 'pi pi-fw pi-angle-right',
            routerLink: ['/ipay-setup/payment-request-running'],
          },
        ],
      },
    ],
  },
  {
    // label: 'Accountant',
    items: [
      {
        label: 'Accountant',
        icon: 'pi pi-fw pi-book',
        items: [
          {
            label: 'Create Payment Request',
            icon: 'pi pi-fw pi-angle-right',
            routerLink: ['ipay-accountant/create-payment-request'],
          },
          {
            label: 'Manage Payment Request',
            icon: 'pi pi-fw pi-angle-right',
            routerLink: ['/ipay-accountant/manage-payment-request'],
          },
        ],
      },
    ],
  },
  {
    // label: 'Financial',
    items: [
      {
        label: 'Financial',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Confirm Payment',
            icon: 'pi pi-fw pi-angle-right',
            routerLink: ['/ipay-financial/confirm-payment'],
          },
          {
            label: 'Create Payment File',
            icon: 'pi pi-fw pi-angle-right',
            routerLink: ['/ipay-financial/create-payment-file'],
          },
          { label: 'Manage Payment', icon: 'pi pi-fw pi-angle-right', routerLink: ['/ipay-financial/manage-payment'] },
          {
            label: 'Import Payment Document',
            icon: 'pi pi-fw pi-angle-right',
            routerLink: ['/ipay-financial/import-payment-document'],
          },
        ],
      },
    ],
  },
  {
    items: [
      {
        label: 'Report',
        icon: 'pi pi-fw pi-print',
      },
    ],
  },
];

export const MENU_ISTM: any = [
  {
    label: 'i-STM',
    items: [
      {
        label: 'Statements',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Create Statements',
            icon: 'pi pi-fw pi-angle-right',
            routerLink: ['/istm-statements/create-statement'],
          },
          {
            label: 'Manage Statements',
            icon: 'pi pi-fw pi-angle-right',
            routerLink: ['/istm-statements/manage-statement'],
          },
        ],
      },
    ],
  },
  {
    // label: 'Receipt',
    items: [
      {
        label: 'Receipt',
        icon: 'pi pi-fw pi-book',
        items: [
          {
            label: 'Create Exception Request',
            icon: 'pi pi-fw pi-angle-right',
            routerLink: ['/istm-receipt/create-exception-request'],
          },
          {
            label: 'Exception Approval',
            icon: 'pi pi-fw pi-angle-right',
            routerLink: ['/istm-receipt/exception-approval'],
          },
        ],
      },
    ],
  },
  {
    // label: 'Setup',
    items: [
      {
        label: 'Setup System',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Create Template',
            icon: 'pi pi-fw pi-angle-right',
            routerLink: ['/istm-statements/create-statement-template'],
          },
          {
            label: 'Charge Fee Setup',
            icon: 'pi pi-fw pi-angle-right',
            routerLink: ['/istm-setup/charge-fee-setup'],
          },
          {
            label: 'Document Running Number',
            icon: 'pi pi-fw pi-angle-right',
            routerLink: ['/istm-setup/document-number-running-setup'],
          },
        ],
      },
    ],
  },
];
