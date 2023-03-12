import {Component, OnInit} from '@angular/core';
import {ReportingService} from "./services/reporting.service";
import {SeriesData} from "./models/series-data.model";
import {Stats} from "./models/stats.model";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import ArrayStore from "devextreme/data/array_store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  perTypeDatasource: SeriesData[]
  perMotifDatasource: SeriesData[]
  perTypeEntrepriseDatasource: SeriesData[]
  perDayOfWeekDatasource: SeriesData[]
  perMonthDatasource: SeriesData[]
  statsDatasource:Stats = {
    day: 0,
    total: 0,
    week: 0,
    month: 0
  }
  usersDatasource: any;
  motifDictionary: any = {
    Decouverte: 'Découverte',
    Negotiation: 'Négociation',
    Conclusion: 'Conclusion',
    Courtoisie: 'Courtoisie',
    VisiteChantier: 'Visite Chantier',
    JPO: 'JPO',
    AccompagnementClient: 'Accompagnement Client',
    BureauEtudeArchitechte: 'Bureau d\'études / Architechte'
  }
  daysDictionary: any={
    0:'Dimanche',
    1:'Lundi',
    2:'Mardi',
    3:'Mercredi',
    4:'Jeudi',
    5:'Vendredi',
    6:'Samedi'
  }
  monthsDictionary: any = {
    1:  'Janvier',
    2:  'Février',
    3:  'Mars',
    4:  'Avril',
    5:  'Mai',
    6:  'Juin',
    7:  'Juillet',
    8:  'Août',
    9:  'Septembre',
    10: 'Octobre',
    11: 'Novembre',
    12: 'Décembre'
  }
  constructor(private service: ReportingService,
              private userService: UserService,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadDashboard("");
  }

  loadUsers(){
    this.userService.getAll()
      .subscribe({
        next: (data) =>{
          let dataForamatted: any[] = [];

          data.forEach(element => {
            let userInfo = {
              id: element.id,
              description: `${element.firstName}, ${element.lastName}`
            }
            dataForamatted.push(userInfo)
          })

          // dataForamatted.sort((a,b) => (a.description > b.description)? 1: (a.description == b.description) ? 0 : -1)

          this.usersDatasource = new ArrayStore({
            data: dataForamatted.sort((a,b) => (a.description > b.description)? 1: (a.description == b.description) ? 0 : -1),
            key: 'id',
          });
        }
      })
  }

  loadDashboard(id: string){
    this.loadPerTypeReportData(id);
    this.loadPerMotifReportData(id);
    this.loadPerTypeEntrepriseReportData(id);
    this.loadPerMonthsReportData(id);
    this.loadPerDayOfTheWeekReportData(id);
    this.loadSummaryData(id);
  }

  loadPerTypeReportData(id: string) {
    this.service.getRendezVousStatByType(id)
      .subscribe({
        next: (d) => {
          this.perTypeDatasource = d;
        }
      })
  }

  loadPerMotifReportData(id: string) {
    this.service.getRendezVousStatByMotif(id)
      .subscribe({
        next: (d) => {
          this.perMotifDatasource = d.map(item => {
            return {val: item.val, key: this.motifDictionary[item.key]}
          });
        }
      })
  }

  loadPerTypeEntrepriseReportData(id: string) {
    this.service.getRendezVousStatByTypeEntreprise(id)
      .subscribe({
        next: (d) => {
          this.perTypeEntrepriseDatasource = d;
        }
      })
  }

  loadPerDayOfTheWeekReportData(id: string) {
    this.service.getRendezVousStatByDayOfWeek(id)
      .subscribe({
        next: (d) => {
          this.perDayOfWeekDatasource = d.map(item => {
            return  {val: item.val, key: this.daysDictionary[item.key]};
          })
        }
      })
  }
  loadPerMonthsReportData(id: string) {
    this.service.getRendezVousStatByMonth(id)
      .subscribe({
        next: (d) => {
          this.perMonthDatasource = d.map(item => {
            return {val: item.val, key: this.monthsDictionary[item.key]}
          })
        }
      })
  }

  loadSummaryData(id: string){
    this.service.getSummary(id)
      .subscribe({
        next: (d) => {
          this.statsDatasource = d;
          }
      })
  }

  selectedUserChanged(event: any){
    this.loadDashboard(event.value);
  }
}
