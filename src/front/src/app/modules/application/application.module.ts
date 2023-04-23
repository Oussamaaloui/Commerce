import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../shared/shared.module";
import {NavBarComponent} from "./Components/nav-bar/nav-bar.component";
import {ApplicationRoutingModule} from "./application-routing.module";
import {ListRdvComponent} from "./Components/list-rdv/list-rdv.component";
import {EditRdvComponent} from "./Components/edit-rdv/edit-rdv.component";
import {CalendarDateFormatter, CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {CustomDateFormatter} from "../../helpers/custom-date.formatter";
import { ListEntreprisesComponent } from './Components/list-entreprises/list-entreprises.component';
import { ListInterlocuteursComponent } from './Components/list-interlocuteurs/list-interlocuteurs.component';



@NgModule({
  declarations: [
    HomeComponent,
    NavBarComponent,
    ListRdvComponent,
    EditRdvComponent,
    ListEntreprisesComponent,
    ListInterlocuteursComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ApplicationRoutingModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory})
  ],
  providers: [
    {provide: CalendarDateFormatter, useClass: CustomDateFormatter}
  ]
})
export class ApplicationModule { }
