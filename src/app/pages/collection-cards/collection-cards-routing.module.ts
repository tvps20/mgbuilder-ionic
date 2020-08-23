import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionCardsPage } from './collection-cards.page';

const routes: Routes = [
  {
    path: '',
    component: CollectionCardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionCardsPageRoutingModule {}
