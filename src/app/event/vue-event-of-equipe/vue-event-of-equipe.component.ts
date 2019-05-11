import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/shared/event.service';
import { CalendarDateFormatter, CalendarView, DAYS_OF_WEEK, CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { CustomDateFormatter } from 'src/app/calendar/custom-date-formatter.provider';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isSameDay, isSameMonth } from 'date-fns';
import { Equipe } from 'src/app/shared/equipe';

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

    @Input() equipe: Equipe;

    events: any[];

    modalData: {
        action: string;
        event: CalendarEvent;
    };
    actions: CalendarEventAction[] = [
        {
            label: '<i class="fa fa-fw fa-pencil"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.handleEvent('Edited', event);
            }
        },
        {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
                this.events = this.events.filter(iEvent => iEvent !== event);
                this.handleEvent('Deleted', event);
            }
        }
    ];

    constructor(
        private route: ActivatedRoute,
        public eventService: EventService,
        private modal: NgbModal
    ) {
        this.events = [];
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

    handleEvent(action: string, event: CalendarEvent): void {
        this.modalData = { event, action };
        this.modal.open(this.modalContent, { size: 'lg' });
    }

    // event
    eventClicked({ event }: { event: CalendarEvent }): void {
        console.log('Event clicked', event);
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
        if (isSameMonth(date, this.viewDate)) {
            this.viewDate = date;
            if (
                (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                events.length === 0
            ) {
                this.activeDayIsOpen = false;
            } else {
                this.activeDayIsOpen = true;
            }
        }
    }

    hourSegmentClicked(date: Date) {
        console.log('Day click', date);
    }
}
