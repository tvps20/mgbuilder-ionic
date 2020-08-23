import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionCardsPageRoutingModule } from './collection-cards-routing.module';

import { CollectionCardsPage } from './collection-cards.page';
import { CollectionContainerComponent } from './collection-container/collection-container.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { ItensListComponent } from './../../shared/components/itens-list/itens-list.component';
import { SharedImportsModule } from './../../shared/imports/shared-imports.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionCardsPageRoutingModule,
    SharedImportsModule
  ],
  declarations: [
    CollectionCardsPage,
    CollectionContainerComponent,
    CollectionListComponent,
    ItensListComponent
  ]
})
export class CollectionCardsPageModule {}
