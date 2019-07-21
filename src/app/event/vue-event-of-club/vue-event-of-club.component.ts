import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  Input
} from '@angular/core';
import {
  CalendarEvent,
  CalendarView,
  CalendarDateFormatter,
  DAYS_OF_WEEK,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { CustomDateFormatter } from 'src/app/calendar/custom-date-formatter.provider';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/shared/event.service';
import { Club } from 'src/app/shared/club';
import { MatDialog } from '@angular/material';
import { VueCreateEventOfClubComponent } from '../vue-create-event-of-club/vue-create-event-of-club.component';
import { VueCreateEventOfEquipeComponent } from '../vue-create-event-of-equipe/vue-create-event-of-equipe.component';
import { ModalModificationEventComponent } from 'src/app/modal/modal-modification-event/modal-modification-event.component';
import { ModalEditEventClubComponent } from 'src/app/modal/modal-edit-event-club/modal-edit-event-club.component';
import { Event } from 'src/app/shared/event';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-vue-event-of-club',
  styleUrls: ['vue-event-of-club.component.css'],
  templateUrl: 'vue-event-of-club.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }      
  ]
})
export class VueEventOfClubComponent implements OnInit {
    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    view: CalendarView = CalendarView.Month;

    CalendarView = CalendarView;
    viewDate: Date = new Date();
    locale = 'fr';
    weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

    events$: Observable<Array<CalendarEvent<{ eventDb: Event }>>>;
    eventsAffiches: any;

    dateAffiche: Date = new Date();
    refresh: Subject<any> = new Subject();
    activeDayIsOpen = false;
    @Input() club: Club;

    constructor(
        private route: ActivatedRoute,
        public eventService: EventService,
        public dialogCreateEventEquipe: MatDialog,
        public dialogCreateEventClub: MatDialog,
        public dialogConfirmerModifEvent: MatDialog,
        public dialogEditEventClub: MatDialog
    ) {
    }
    
    ngOnInit() {
        this.loadEvents();
    }

    loadEvents() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.events$ = this.eventService.getAllEventsFromClub(id);
        this.events$.subscribe((data: any) =>{
            const eventsAffiches = [];
            data.map((event: any) => {
                if(moment(event.start).isSame(new Date(), 'day')||moment(event.end).isSame(new Date(), 'day')){
                    eventsAffiches.push(event);
                }
            });
            this.eventsAffiches = eventsAffiches;
        });
    }

    /* ---------------- Fonctions utiles ------------ */

    setView(view: CalendarView) {
        this.view = view;
    }

    // event
    eventClicked({ event }: { event: Event }): void {
        console.log('Event clicked', event);
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        this.dateAffiche = date;
        this.eventsAffiches = events;
    }
    
    modificationHoraire({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
        this.openModifEvent(event, newStart, newEnd);        
    }

    openCreateEventClub() {
        const dialogClub = this.dialogCreateEventClub
            .open(VueCreateEventOfClubComponent, {
                width: '50%',
                data: {club: this.club}
            });

        dialogClub.afterClosed().subscribe(result => {
            if(result){
                this.refreshView();
                this.loadEvents();
            }
        });
    }

    openCreateEventEquipe() {
        const dialogEquipe = this.dialogCreateEventEquipe.open(VueCreateEventOfEquipeComponent, {
            width: '50%',
            data: {club: this.club}
        });

        dialogEquipe.afterClosed().subscribe(result => {
            if(result){
                this.refreshView();
                this.loadEvents();
            }
        });
    }
    
    openModifEvent(event, newStart, newEnd) {
        const dialogModifEvent = this.dialogConfirmerModifEvent.open(ModalModificationEventComponent, {
            width: '50%',
            data: {event: event, newStart: newStart, newEnd: newEnd }
        });

        dialogModifEvent.afterClosed().subscribe(result => {
            if(result){
                this.refreshView();
                this.loadEvents();
            }
        });
    }
    
    openEditEventClub(event) {
        const dialogEditEventClub = this.dialogEditEventClub.open(ModalEditEventClubComponent, {
            width: '50%',
            data: {event: event}
        });

        dialogEditEventClub.afterClosed().subscribe(result => {
            if(result){
                this.refreshView();
                this.loadEvents();
            }
        });
    }
    
    refreshView(): void {
        this.refresh.next();
    }
}

