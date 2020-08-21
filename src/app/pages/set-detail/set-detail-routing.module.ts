import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetDetailPage } from './set-detail.page';
import { CardsSetResolveGuard } from './../../shared/guards/cards-set-resolve.guard';

const routes: Routes = [
  {
    path: '',
    component: SetDetailPage,
    resolve: { cards: CardsSetResolveGuard }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetDetailPageRoutingModule {}
