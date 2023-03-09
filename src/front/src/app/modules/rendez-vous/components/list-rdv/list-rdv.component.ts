import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {isSameDay, isSameMonth} from 'date-fns';
import {map, Subject} from 'rxjs';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView,} from 'angular-calendar';
import {EventColor} from 'calendar-utils';
import {RendezVous} from 'src/app/modules/rendez-vous/models/rendez-vous.model';
import {RendezVousService} from 'src/app/modules/rendez-vous/services/rendez-vous.service';



@Component({
  selector: 'app-list-rdv',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list-rdv.component.html',
  styleUrls: ['./list-rdv.component.css']
})
export class ListRdvComponent implements OnInit {
  @ViewChild("closeButton") modalCloseButton: ElementRef<HTMLElement>;
  @ViewChild("openModal") openModalButton: ElementRef<HTMLElement>;

  userName: string = '';
  listRendezVous: CalendarEvent[] = [];
  loadingData: boolean = false;
  selectedOpenMode: boolean = true;
  isDrawerOpen: boolean = false;
  // Devextrem popup!
  popupVisible: boolean = false;
  modalMode: 'edit' | 'create' | 'view' = 'create';
  currentRdv: RendezVous;
  // Calendar part!
  userIds: string[] = [];
  getColorForUser(userId: string): EventColor{
    let indexOfUser = this.userIds.indexOf(userId);
    if(indexOfUser == -1){
      // user wasn't assigned a color
      this.userIds.push(userId);
      return this.randomColors[0];
    }else{
      return this.randomColors[indexOfUser % this.randomColors.length];
    }
  }

  randomColors : EventColor[] = [
    {
      // orange color
      secondary: '#ea580c',
      primary: '#ea580c'
    },
    {
      // slate color
      secondary: '#475569',
      primary: '#475569'
    },
    {
      // Teal
      secondary: '#0d9488',
      primary: '#0d9488'
    },
    {
      // blue color
      secondary: '#2563eb',
      primary: '#2563eb'
    },
    {
      // green color
      secondary: '#16a34a',
      primary: '#16a34a'
    },
    {
      // Fuchsia
      secondary: '#c026d3',
      primary: '#c026d3'
    },
    {
      // red
      primary:'#dc2626',
      secondary:'#dc2626'
    },
    {
      // indigo
      primary:'#4f46e5',
      secondary:'#4f46e5'
    }
  ];

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  events: CalendarEvent[] = [];
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt text-white "></i> ',
      a11yLabel: 'Edit',
      onClick: ({event}: { event: CalendarEvent }): void => {
        console.log('editer clicked!')
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt text-white "></i>',
      a11yLabel: 'Delete',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    }
  ];

  activeDayIsOpen: boolean = true;
  // Password handling
  changePasswordDialogVisible = false;
  triggerOpen: Subject<void> = new Subject<void>();
  // change info handling
  changeInfoDialogVisible = false;
  triggerChangeInfoOpen: Subject<void> = new Subject<void>();
  // change Email handling
  changeEmailDialogVisible = false;
  triggerChangeEmailOpen: Subject<void> = new Subject<void>();

  constructor(private authService: AuthenticationService,
              private rdvService: RendezVousService) {
    this.currentRdv = this.initNewRdv();
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  initNewRdv(): RendezVous {
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
      end: new Date(),
      user: '',
      userId: ''
    }
  }

  ngOnInit(): void {
    this.loadingData = true;
    this.userName = `${this.authService.currentUserValue?.firstName}, ${this.authService.currentUserValue?.lastName}`;
    this.loadRendezVous();
    this.scrollToView();
  }

  scrollToView() {
    setTimeout(() => {
      const elements = document.getElementsByClassName("cal-time");
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].innerHTML.indexOf('13') > 0) {
          elements[i].scrollIntoView({block: 'center', behavior: 'smooth'});
          break;
        }

      }
    }, 0);
  }

  openModalInMode(mode: 'edit' | 'create' | 'view') {
    this.modalMode = mode;

    if (mode === 'create') {
      this.currentRdv = this.initNewRdv();
    }

    this.popupVisible = true;
  }

  cancelCreateOrUpdate() {
    this.popupVisible = false;
  }

  createdOrUpdateEvent() {
    this.popupVisible = false;
    this.loadRendezVous();
  }

  loadRendezVous() {
    this.loadingData = true;

    this.rdvService.getAll()
      .pipe(
        map(data => {
          this.events = [];
          data.forEach(element => {
            let myEvent: CalendarEvent = {
              start: new Date(element.start),
              end: new Date(element.end),
              title: element.titre,
              color: this.getColorForUser(element.userId),
              actions: this.actions,
              allDay: false,
              resizable: {
                beforeStart: true,
                afterEnd: true,
              },
              draggable: true,
              id: element.id,
              meta: {
                description: element.description,
                user: element.user,
                userId: element.userId
              }
            }

            this.events.push(myEvent);
          })
          this.refresh.next();
          this.loadingData = false
        }))
      .subscribe({
        error: (err) => {
          this.loadingData = false;
        }
      });
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
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
    if (action === 'Clicked') {
      this.eventClicked(event);
    } else if (action === 'Deleted') {
      this.deleteEvent(event);
    } else if (action === 'Edited') {
      this.editEvent(event);
    } else {
      console.log(`${action} : Not implemented`)
    }
  }

  eventClicked(event: any) {
    this.edit(event.id);
  }

  edit(id: string) {
    this.rdvService.getById(id)
      .pipe()
      .subscribe(rdv => {
        this.currentRdv = rdv;
        console.log(this.currentRdv);
        this.openModalInMode('edit');
      })
  }

  eventTimeUpdated(event: any, newStart: Date, newEnd: Date | undefined) {
    let changedEvent = this.events.filter(e => e.id === event.id)
    if (changedEvent.length == 1) {
      if (changedEvent[0].id && changedEvent[0].start && changedEvent[0].end) {
        console.log()
        this.rdvService.updateTiming(changedEvent[0].id.toString(), changedEvent[0].start, changedEvent[0].end)
          .pipe()
          .subscribe();
      }
    }
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    if (eventToDelete && eventToDelete.id) {
      this.rdvService.delete(eventToDelete.id.toString())
        .pipe(map(() => this.events.filter((event) => event !== eventToDelete)))
        .subscribe()
    }
  }

  editEvent(event: any) {
    this.edit(event.id);
  }

  setView(view: CalendarView) {
    this.view = view;

    if (view === CalendarView.Day || view === CalendarView.Week) {
      this.scrollToView();
    }
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  hourSegmentClicked(event: any) {
    if (this.popupVisible) {
      return;
    }
    const startDate = event.date;
    let endDate: Date = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1)

    this.currentRdv = this.initNewRdv();
    this.currentRdv.start = startDate;
    this.currentRdv.end = endDate;
    this.modalMode = 'create';
    this.popupVisible = true;
  }

  showChangePasswordDialog() {
    this.triggerOpen.next()
    this.changePasswordDialogVisible = true;
  }

  closeChangePasswordDialog() {
    this.changePasswordDialogVisible = false;
  }

  showChangeInfoDialog() {
    this.triggerChangeInfoOpen.next()
    this.changeInfoDialogVisible = true;
  }

  closeChangeInfoDialog() {
    this.changeInfoDialogVisible = false;
  }

  showChangeEmailDialog() {
    this.triggerChangeEmailOpen.next()
    this.changeEmailDialogVisible = true;
  }

  closeChangeEmailDialog() {
    this.changeEmailDialogVisible = false;
  }
}
