import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { Tab3PageRoutingModule } from './tab3-routing.module'
import { SettingsListComponent } from './settings-list/settings-list.component';
import { UserNavComponent } from './user-nav/user-nav.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
  ],
  declarations: [
    Tab3Page,
    UserNavComponent,
    SettingsListComponent
  ]
})
export class Tab3PageModule {}
