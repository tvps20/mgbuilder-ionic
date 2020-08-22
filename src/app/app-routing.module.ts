import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'sets',
    loadChildren: () => import('./pages/sets/sets.module').then( m => m.SetsPageModule)
  },
  {
    path: 'favorite-cards',
    loadChildren: () => import('./pages/favorite-cards/favorite-cards.module').then( m => m.FavoriteCardsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
