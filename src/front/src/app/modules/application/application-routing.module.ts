import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../../helpers/auth.guard";
import {HomeComponent} from "./home/home.component";
import {ListRdvComponent} from "./Components/list-rdv/list-rdv.component";
import {ListEntreprisesComponent} from "./Components/list-entreprises/list-entreprises.component";
import {ListInterlocuteursComponent} from "./Components/list-interlocuteurs/list-interlocuteurs.component";

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path:'rdv',
        component: ListRdvComponent
      },
      {
        path:'entreprises',
        component: ListEntreprisesComponent
      },
      {
        path:'interlocuteurs',
        component: ListInterlocuteursComponent
      },
      {
        path:'**',
        redirectTo: 'rdv'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
