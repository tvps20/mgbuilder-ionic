import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertInfoComponent } from '../components/alert-info/alert-info.component';
import { LoadErrorComponent } from '../components/load-error/load-error.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    LoadErrorComponent,
    AlertInfoComponent
  ],
  declarations: [
    LoadErrorComponent,
    AlertInfoComponent
  ]
})
export class SharedImportsModule { }
