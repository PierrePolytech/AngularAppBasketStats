import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
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

@Component({
  selector: 'app-vue-event-of-club',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

    events: any[] ;

    activeDayIsOpen = true;

    constructor(
        private route: ActivatedRoute,
        public eventService: EventService
    ) {
        this.events = [];
    }

    ngOnInit() {
        this.loadEvents();
    }

    loadEvents() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.eventService.getAllEventsFromClub(id).subscribe((data: {}) => {
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

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        console.log('Day click', date , '/ events', events);
    }
}

