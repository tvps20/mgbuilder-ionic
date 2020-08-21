import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetDetailPageRoutingModule } from './set-detail-routing.module';

import { SetDetailPage } from './set-detail.page';
import { SharedImportsModule } from './../../shared/imports/shared-imports.module';
import { CardsListComponent } from './../../shared/components/cards-list/cards-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetDetailPageRoutingModule,
    SharedImportsModule
  ],
  declarations: [
    SetDetailPage,
    CardsListComponent
  ]
})
export class SetDetailPageModule {}
