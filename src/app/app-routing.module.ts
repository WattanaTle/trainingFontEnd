import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'itr-setup',
        loadChildren: () => import('./pages/i-Tr/setup/setup.module').then((m) => m.SetupModule),
      },
    
      { path: '', redirectTo: 'itr-setup/receivable-option', pathMatch: 'full' },
      { path: '**', redirectTo: 'itr-setup/receivable-option' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
