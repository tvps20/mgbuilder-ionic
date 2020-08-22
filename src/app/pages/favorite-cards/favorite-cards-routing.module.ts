import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteCardsPage } from './favorite-cards.page';
import { FavoriteResolveGuard } from './../../shared/guards/favorite-resolve.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FavoriteCardsPage,
        resolve:  { favorites: FavoriteResolveGuard }
      },
      {
        path: ':code/cards/:id',
        loadChildren: () => import('../../pages/card-detail/card-detail.module').then(m => m.CardDetailPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteCardsPageRoutingModule {}
