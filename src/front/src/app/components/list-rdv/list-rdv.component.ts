import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { LoginModel } from 'src/app/models/login.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { initModals } from 'flowbite';

 
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { map, Subject } from 'rxjs'; 
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarEventTitleFormatter,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { CustomEventTitleFormatter } from '../../helpers/custom-date.formatter';
import { RendezVous } from 'src/app/models/rendez-vous.model';
import { RendezVousService } from 'src/app/services/rendez-vous.service';
import { EditRdvComponent } from '../edit-rdv/edit-rdv.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
// import { initModals } from '../../../assets/js/flow'



@Component({
  selector: 'app-list-rdv',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list-rdv.component.html',
  styleUrls: ['./list-rdv.component.css'],
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
     }
  ]
})
export class ListRdvComponent implements OnInit {
    @ViewChild("closeButton") modalCloseButton: ElementRef<HTMLElement>;
    @ViewChild("openModal") openModalButton: ElementRef<HTMLElement>;
  userName: string = '';
  listRendezVous : CalendarEvent[] = []; 
  

  constructor(private authService: AuthenticationService,
    private rdvService: RendezVousService) {
      this.currentRdv = this.initNewRdv();
    }

    // Devextrem popup!
    popupVisible: boolean = false;
    modalMode: 'edit'|'create'|'view' = 'create';
    currentRdv: RendezVous;

    initNewRdv(): RendezVous{
      return {
        id: '',
        titre: '',
        description: '',
        entreprise: '',
        addresse: '',
        ville: '',
        codePostal: '',
        typeEntreprise: undefined,
        interlocuteur: '',
        numero: '',
        email: '',
        typeRendezVous: undefined,
        motif: undefined,
        start: new Date(),
        end:  new Date()
      }
    }

  ngOnInit(): void {
    this.userName = `${this.authService.currentUserValue?.firstName}, ${this.authService.currentUserValue?.lastName}`;
    this.loadRendezVous() 
  } 

  openModalInMode(mode: 'edit'|'create'|'view'){
    this.modalMode = mode; 
    
    if(mode === 'create'){
      this.currentRdv = this.initNewRdv();
    }

    this.popupVisible = true; 
  }

  cancelCreateOrUpdate(){
    this.popupVisible = false;
  }
  createdOrUpdateEvent(){ 
    this.popupVisible = false;
    this.loadRendezVous();
  }

  // Calendar part! 
  colors: Record<string, EventColor> = {
    red: {
      secondary: '#ea580c',
      primary: '#ea580c',
    }
  }; 
  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

   

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt text-white "></i> ',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log('editer clicked!')
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt text-white "></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();


  loadRendezVous(){

    this.rdvService.getAll()
    .pipe(
      map(data =>{ 
        this.events = [];
        data.forEach(element => {
          let myEvent : CalendarEvent = {
            start: new Date(element.start),
            end: new Date(element.end),
            title: element.titre,
            color: { ...this.colors['red'] },
            actions: this.actions,
            allDay: false,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
            id: element.id
          }

          this.events.push(myEvent);
        })
        this.refresh.next(); 
      }))
    .subscribe(); 
  }

  events: CalendarEvent[] = [ 
  ];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  } 

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    // console.log(event);
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.eventTimeUpdated(event, newStart, newEnd);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    if(action==='Clicked'){
      this.eventClicked(event);
    }
    else if(action === 'Deleted'){
      this.deleteEvent(event);
    }else if(action === 'Edited'){
      this.editEvent(event);
    }
    else{
      console.log(`${action} : Not implemented`)
    }
  }

  eventClicked(event: any){
    this.edit(event.id);
  }

  edit(id: string){
    this.rdvService.getById(id)
    .pipe()
    .subscribe(rdv => {
      this.currentRdv = rdv;
      this.openModalInMode('edit');
    }) 
  }

  eventTimeUpdated(event: any, newStart: Date, newEnd : Date | undefined){
    console.log('Event time changed:')
    console.log(event)
    console.log(this.events)

    let changedEvent = this.events.filter(e => e.id === event.id)
    if(changedEvent.length == 1){
      if(changedEvent[0].id && changedEvent[0].start && changedEvent[0].end){ 
        console.log()
        this.rdvService.updateTiming(changedEvent[0].id.toString(), changedEvent[0].start, changedEvent[0].end)
        .pipe()
        .subscribe();
      } 
    } 
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: this.colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    if(eventToDelete && eventToDelete.id){
      this.rdvService.delete(eventToDelete.id.toString())
      .pipe(map(() => this.events.filter((event) => event !== eventToDelete)))
      .subscribe()
    } 
  }

  editEvent(event: any){
    this.edit(event.id);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  debugConsole(input: any){
    console.log(input)
  }

}
