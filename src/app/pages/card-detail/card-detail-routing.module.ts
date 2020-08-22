import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardDetailPage } from './card-detail.page';
import { CardResolveGuard } from './../../shared/guards/card-resolve.guard';

const routes: Routes = [
  {
    path: '',
    component: CardDetailPage,
    resolve: { card: CardResolveGuard }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardDetailPageRoutingModule { }
