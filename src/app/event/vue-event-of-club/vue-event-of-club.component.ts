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
  DAYS_OF_WEEK
} from 'angular-calendar';
import { CustomDateFormatter } from 'src/app/calendar/custom-date-formatter.provider';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/shared/event.service';
import { Club } from 'src/app/shared/club';
import { MatDialog } from '@angular/material';
import { VueCreateEventOfClubComponent } from '../vue-create-event-of-club/vue-create-event-of-club.component';
import { VueCreateEventOfEquipeComponent } from '../vue-create-event-of-equipe/vue-create-event-of-equipe.component';
import { Event } from 'src/app/shared/event';
import RRule from 'rrule';

@Component({
  selector: 'app-vue-event-of-club',
  styleUrls: ['vue-event-of-club.component.css'],
  templateUrl: 'vue-event-of-club.component.html',
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

    events: Event[] ;
    eventsAffiches: Event[];

    dateAffiche: Date = new Date();

    activeDayIsOpen = true;

    @Input() club: Club;

    constructor(
        private route: ActivatedRoute,
        public eventService: EventService,
        public dialogCreateEventEquipe: MatDialog,
        public dialogCreateEventClub: MatDialog
    ) {
        this.events = [];
        this.eventsAffiches = [];
    }

    ngOnInit() {
        this.loadEvents();
    }

    loadEvents() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.eventService.getAllEventsFromClub(id).subscribe((data: {}) => {
            const eventsAPI = data as Event[];
            eventsAPI.forEach((event: Event) => {
                if (event.rrule != null) {
                    // console.log(this.createEventRecurent(event));
                } else {
                    this.events.push(event);
                }
            });
            console.log(this.events);
        });
    }

    /* ---------------- Fonctions utiles ------------ */

    setView(view: CalendarView) {
        this.view = view;
    }

    closeOpenMonthViewDay() {
        this.activeDayIsOpen = false;
    }

    // event
    eventClicked({ event }: { event: Event }): void {
        console.log('Event clicked', event);
    }

    dayClicked({ date, events }: { date: Date; events: Event[] }): void {
        console.log('Day click', date , '/ events', events);
        this.dateAffiche = date;
        this.eventsAffiches = events;
    }

    openCreateEventClub() {
        const dialogClub = this.dialogCreateEventClub
            .open(VueCreateEventOfClubComponent, {
                width: '50%',
                data: {club: this.club}
            });

        dialogClub.afterClosed().subscribe(result => {
            this.loadEvents();
        });
    }

    openCreateEventEquipe() {
        const dialogEquipe = this.dialogCreateEventEquipe.open(VueCreateEventOfEquipeComponent, {
            width: '50%',
            data: {club: this.club}
        });

        dialogEquipe.afterClosed().subscribe(result => {
            this.loadEvents();
        });
    }

    createEventRecurent(event: Event) {
        const events: Event[] = [];
        const rrule =  {
            freq: event.rrule.freq,
            byweekday: event.rrule.byweekday
        };
        const rule: RRule = new RRule({
            ... rrule,
            dtstart: new Date(event.dateDebut),
            until: new Date(event.dateFin)
        });
        rule.all().forEach(date => {
            const datefin = date;
            datefin.setHours(15, 30, 0);
            events.push(
                new Event(
                    event.id, event.title,
                    new Date(date), new Date(datefin),
                    event.infosSup, {primary: '#1e90ff', secondary: '#D1E8FF'},
                    {beforeStart: false, afterEnd: false},
                    false)
            );
        });
        return events;
    }
}

