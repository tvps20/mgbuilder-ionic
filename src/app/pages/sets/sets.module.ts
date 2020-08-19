import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetsPageRoutingModule } from './sets-routing.module';

import { SetsPage } from './sets.page';
import { SetsListComponent } from './sets-list/sets-list.component';
import { SharedImportsModule } from './../../shared/imports/shared-imports.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetsPageRoutingModule,
    SharedImportsModule
  ],
  declarations: [
    SetsPage,
    SetsListComponent
  ]
})
export class SetsPageModule {}
