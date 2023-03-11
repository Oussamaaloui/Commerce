import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { HomeComponent } from './components/home/home.component';
import {DxChartModule, DxPieChartModule} from "devextreme-angular";
import { PieChartWrapperComponent } from './components/home/components/pie-chart-wrapper/pie-chart-wrapper.component';


@NgModule({
  declarations: [
    AdministrationComponent,
    WelcomeComponent,
    NavBarComponent,
    UsersListComponent,
    HomeComponent,
    PieChartWrapperComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule,
    DxPieChartModule,
    DxChartModule
  ]
})
export class AdministrationModule { }
