import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetDetailPage } from './set-detail.page';
import { CardsSetResolveGuard } from './../../shared/guards/cards-set-resolve.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cards',
        children: [
          {
            path: '',
            component: SetDetailPage,
            resolve: { cards: CardsSetResolveGuard }
          },
          {
            path: ':id',
            loadChildren: () => import('../../pages/card-detail/card-detail.module').then(m => m.CardDetailPageModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetDetailPageRoutingModule { }
