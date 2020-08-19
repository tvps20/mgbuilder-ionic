import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetsPageRoutingModule } from './sets-routing.module';

import { SetsPage } from './sets.page';
import { SetsListComponent } from './../../shared/components/sets-list/sets-list.component';
import { LoadErrorComponent } from './../../shared/components/load-error/load-error.component';
import { AlertInfoComponent } from './../../shared/components/alert-info/alert-info.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetsPageRoutingModule
  ],
  declarations: [
    SetsPage,
    SetsListComponent,
    LoadErrorComponent,
    AlertInfoComponent
  ]
})
export class SetsPageModule {}
