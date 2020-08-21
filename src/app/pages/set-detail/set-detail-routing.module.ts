import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetDetailPage } from './set-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SetDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetDetailPageRoutingModule {}
