import {Component, OnInit} from '@angular/core';
import {ReportingService} from "./services/reporting.service";
import {SeriesData} from "./models/series-data.model";

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
  constructor(private service: ReportingService) {
  }

  ngOnInit(): void {
    this.loadPerTypeReportData();
    this.loadPerMotifReportData();
    this.loadPerTypeEntrepriseReportData();
    this.loadPerMonthsReportData();
    this.loadPerDayOfTheWeekReportData();
  }

  loadPerTypeReportData() {
    this.service.getRendezVousStatByType()
      .subscribe({
        next: (d) => {
          this.perTypeDatasource = d;
        }
      })
  }

  loadPerMotifReportData() {
    this.service.getRendezVousStatByMotif()
      .subscribe({
        next: (d) => {
          this.perMotifDatasource = d.map(item => {
            return {val: item.val, key: this.motifDictionary[item.key]}
          });
        }
      })
  }

  loadPerTypeEntrepriseReportData() {
    this.service.getRendezVousStatByTypeEntreprise()
      .subscribe({
        next: (d) => {
          this.perTypeEntrepriseDatasource = d;
        }
      })
  }

  loadPerDayOfTheWeekReportData() {
    this.service.getRendezVousStatByDayOfWeek()
      .subscribe({
        next: (d) => {
          this.perDayOfWeekDatasource = d.map(item => {
            return  {val: item.val, key: this.daysDictionary[item.key]};
          })
        }
      })
  }
  loadPerMonthsReportData() {
    this.service.getRendezVousStatByMonth()
      .subscribe({
        next: (d) => {
          this.perMonthDatasource = d.map(item => {
            return {val: item.val, key: this.monthsDictionary[item.key]}
          })
        }
      })
  }
}
