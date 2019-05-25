import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/shared/event.service';
import { CalendarDateFormatter, CalendarView, DAYS_OF_WEEK, CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { CustomDateFormatter } from 'src/app/calendar/custom-date-formatter.provider';
import { isSameDay, isSameMonth } from 'date-fns';
import { Equipe } from 'src/app/shared/equipe';
import { MatDialog } from '@angular/material';
import { VueCreateEventOfEquipeComponent } from '../vue-create-event-of-equipe/vue-create-event-of-equipe.component';
import { Event } from 'src/app/shared/event';

@Component({
  selector: 'app-vue-event-of-equipe',
  templateUrl: './vue-event-of-equipe.component.html',
  styleUrls: ['./vue-event-of-equipe.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
export class VueEventOfEquipeComponent implements OnInit {
    @ViewChild('modalContent') modalContent: TemplateRef<any>;
    view: CalendarView = CalendarView.Month;
    CalendarView = CalendarView;
    viewDate: Date = new Date();
    locale = 'fr';
    weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
    activeDayIsOpen = false;
    eventsAffiches: Event[];

    dateAffiche: Date = new Date();

    @Input() equipe: Equipe;

    events: any[];

    constructor(
        private route: ActivatedRoute,
        public eventService: EventService,
        public dialogCreateEventEquipe: MatDialog
    ) {
        this.events = [];
        this.eventsAffiches = [];
     }

    ngOnInit() {
        this.loadEvents();
    }

    loadEvents() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.eventService.getAllEventsFromEquipe(id).subscribe((data: {}) => {
            this.events = data as Event[];
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
    eventClicked({ event }: { event: CalendarEvent }): void {
        console.log('Event clicked', event);
    }

    dayClicked({ date, events }: { date: Date; events: Event[] }): void {
        console.log('Day click', date , '/ events', events);
        this.dateAffiche = date;
        this.eventsAffiches = events;
    }

    openCreateEventEquipe() {
        const dialogEquipe = this.dialogCreateEventEquipe.open(VueCreateEventOfEquipeComponent, {
            width: '50%',
            data: {equipe: this.equipe}
        });

        dialogEquipe.afterClosed().subscribe(result => {
            this.loadEvents();
        });
    }
}
