import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RendezVousRoutingModule } from './rendez-vous-routing.module';
import {ListRdvComponent} from "./components/list-rdv/list-rdv.component";
import {EditRdvComponent} from "./components/edit-rdv/edit-rdv.component";
import {NavBarComponent} from "./components/nav-bar/nav-bar.component";
import {SharedModule} from "../shared/shared.module";
import {CalendarDateFormatter, CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {CustomDateFormatter} from "../../helpers/custom-date.formatter";


@NgModule({
  declarations: [
    ListRdvComponent,
    EditRdvComponent,
    NavBarComponent ],
  imports: [
    CommonModule,
    SharedModule,
    RendezVousRoutingModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory})
  ],
  providers: [
    {provide: CalendarDateFormatter, useClass: CustomDateFormatter}
  ]
})
export class RendezVousModule { }
