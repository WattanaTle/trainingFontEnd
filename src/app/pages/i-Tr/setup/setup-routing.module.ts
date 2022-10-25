import { SetupComponent } from './setup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { R0001Component } from './r0001/r0001.component';
import { R0002Component } from './r0002/r0002.component';
import { R0003Component } from './r0003/r0003.component';

const routes: Routes = [
  {
    path: '',
    component: SetupComponent,
    children: [
      {
        path: 'receivable-option',
        component: R0001Component,
      },
      {
        path: 'receipt-confirmation',
        component: R0002Component,
      },
      {
        path: 'receipt-running',
        component: R0003Component,
      },
    ],
  },
  { path: '**', redirectTo: '/itr-setup/' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupRoutingModule { }
