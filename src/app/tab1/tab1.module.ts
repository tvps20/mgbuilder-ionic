import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { HomeNavComponent } from './home-nav/home-nav.component';
import { DecksListComponent } from './decks-list/decks-list.component';
import { SharedImportsModule } from './../shared/imports/shared-imports.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    SharedImportsModule
  ],
  declarations: [
    Tab1Page,
    HomeNavComponent,
    DecksListComponent
  ]
})
export class Tab1PageModule {}
