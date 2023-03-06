import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DxPopupModule } from 'devextreme-angular';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdministrationComponent,
    WelcomeComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule
  ]
})
export class AdministrationModule { }
