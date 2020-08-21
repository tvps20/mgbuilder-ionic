import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetDetailPageRoutingModule } from './set-detail-routing.module';

import { SetDetailPage } from './set-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetDetailPageRoutingModule
  ],
  declarations: [SetDetailPage]
})
export class SetDetailPageModule {}
