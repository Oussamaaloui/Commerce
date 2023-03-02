import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { LoginModel } from 'src/app/models/login.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';


 
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
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { ModalService } from 'src/app/shared/modal/modal.service';



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
  
  @ViewChild('modalComponent') modal:
    | ModalComponent<EditRdvComponent>
    | undefined;

    async showModal(){
      let modalRef = await this.modalService.open(EditRdvComponent)
        
      if(modalRef){
        modalRef.instance.user = this.events;
        modalRef.instance.cancel.subscribe(() => {
          console.log('rdv creation canceled!')
          this.modalService.close()
        })
        modalRef.instance.createdOrUpdated.subscribe(() => {
          console.log('rdv created!')
          this.modalService.close()
        })
      }
    }

  userName: string = '';
  listRendezVous : CalendarEvent[] = []; 

  constructor(private authService: AuthenticationService, 
    private rdvService: RendezVousService,
    private modalService: ModalService<EditRdvComponent>) {}

  ngOnInit(): void {
    this.userName = `${this.authService.currentUserValue?.firstName}, ${this.authService.currentUserValue?.lastName}`;
    this.loadRendezVous()
  }

  // Calendar part!

  colors: Record<string, EventColor> = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  }; 
  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

   

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt">Editer</i> ',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt">Supprimer</i>',
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
    console.log('Event clicked:')
    console.log(event)
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

  editEvent(event: CalendarEvent){
    console.log('edited')
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
