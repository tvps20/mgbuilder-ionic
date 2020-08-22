import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardDetailPageRoutingModule } from './card-detail-routing.module';

import { CardDetailPage } from './card-detail.page';

import { CardsDetailComponent } from './../../shared/components/cards-detail/cards-detail.component';
import { SharedImportsModule } from './../../shared/imports/shared-imports.module';
import { PopoverCardComponent } from './popover-card/popover-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CardDetailPageRoutingModule,
    SharedImportsModule
  ],
  declarations: [
    CardDetailPage,
    CardsDetailComponent,
    PopoverCardComponent
  ]
})
export class CardDetailPageModule {}
