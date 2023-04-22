import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ReportingService} from "./services/reporting.service";
import {SeriesData} from "./models/series-data.model";
import {Stats} from "./models/stats.model";
import {UserService} from "../../services/user.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import ArrayStore from "devextreme/data/array_store";

/**
 * Data export to PDF
 */
import domToImage from 'dom-to-image';
import jsPDF, {jsPDFOptions} from 'jspdf';
import moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('dashboardContent') dashboardContent!: ElementRef;
  isDisabled: boolean = false;
  public downloadAsPDF() {
    this.isDisabled = true

    const width = this.dashboardContent.nativeElement.clientWidth;
    const height = this.dashboardContent.nativeElement.clientHeight + 40;
    domToImage
      .toPng(this.dashboardContent.nativeElement, {
        width: width,
        height: height
      })
      .then(result => {
        const pdf = new jsPDF('l', 'pt', [width + 50, height + 220]);
        pdf.setFontSize(48);
        pdf.setTextColor('#2585fe');
        pdf.text("Rapport de rendez-vous global", 25, 75);
        pdf.setFontSize(24);
        pdf.setTextColor('#131523');
        pdf.text('Date: ' + moment().format('LLLL'), 25, 115);
        pdf.addImage(result, 'PNG', 25, 185, width, height);

        //adding logo:
        let logo = new Image();
        logo.src = 'assets/img/Logo1.png'
        pdf.addImage(logo, 'png', 1350, 35, 270, 60);

        // adding agent name:
        if(this.selectedAgentId){
          let userDescription = this.userData.filter((e: any) => e.id === this.selectedAgentId)[0].description;
          pdf.text(`Agent: ${userDescription}`, 25, 155);
        }

        pdf.save('Rapport de rendez-vous global'+ '.pdf');
        this.isDisabled = false;
      })
      .catch(error => {
        console.error(error)
        this.isDisabled = true;
      });
  }

  perTypeDatasource: SeriesData[]
  perMotifDatasource: SeriesData[]
  perTypeEntrepriseDatasource: SeriesData[]
  perDayOfWeekDatasource: SeriesData[]
  perMonthDatasource: SeriesData[];
  perAgentDatasource: SeriesData[];
  perAgentThisMonthDatasource: SeriesData[];
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
    moment.locale('fr')
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadDashboard("");
  }

  userData: any[] = [];

  loadUsers(){
    this.userService.getAll()
      .subscribe({
        next: (data) =>{

          this.userData = [];

          data.forEach(element => {
            let userInfo = {
              id: element.id,
              description: `${element.firstName}, ${element.lastName}`
            }
            this.userData.push(userInfo)
          })

          // dataForamatted.sort((a,b) => (a.description > b.description)? 1: (a.description == b.description) ? 0 : -1)

          this.usersDatasource = new ArrayStore({
            data: this.userData.sort((a,b) => (a.description > b.description)? 1: (a.description == b.description) ? 0 : -1),
            key: 'id',
          });
        }
      })
  }

  loadDashboard(id: string){
    this.isDisabled = true;
    this.loadPerTypeReportData(id);
    this.loadPerMotifReportData(id);
    this.loadPerTypeEntrepriseReportData(id);
    this.loadPerMonthsReportData(id);
    this.loadPerDayOfTheWeekReportData(id);
    this.loadSummaryData(id);
    this.loadPerAgentReportData();
    this.loadPerAgentThisMonthReportData();
    this.isDisabled = false;
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

  loadPerAgentReportData(){
    this.service.getByAgent()
      .subscribe({
        next: (d) => {
          this.perAgentDatasource = d
        }
      })
  }

  loadPerAgentThisMonthReportData(){
    this.service.getByAgentThisMonth()
      .subscribe({
        next: (d) => {
          this.perAgentThisMonthDatasource = d;
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
    this.selectedAgentId = event.value;
    this.loadDashboard(event.value);
  }

  selectedAgentId:string = '';
}
