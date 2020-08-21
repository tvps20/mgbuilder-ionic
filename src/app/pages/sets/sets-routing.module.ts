import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetsPage } from './sets.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SetsPage
      },
      {
        path: ':code',
        loadChildren: () => import('../../pages/set-detail/set-detail.module').then(m => m.SetDetailPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetsPageRoutingModule { }
