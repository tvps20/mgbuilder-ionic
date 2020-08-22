import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoriteCardsPageRoutingModule } from './favorite-cards-routing.module';

import { FavoriteCardsPage } from './favorite-cards.page';
import { SharedImportsModule } from './../../shared/imports/shared-imports.module';
import { CardsListComponent } from './../../shared/components/cards-list/cards-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteCardsPageRoutingModule,
    SharedImportsModule
  ],
  declarations: [
    FavoriteCardsPage,
    CardsListComponent
  ]
})
export class FavoriteCardsPageModule {}
