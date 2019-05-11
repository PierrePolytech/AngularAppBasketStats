import { CalendarEvent } from 'angular-calendar';
import { EventColor } from 'calendar-utils';

export class Event implements CalendarEvent {
    actions?: import ('calendar-utils').EventAction[];
    allDay?: boolean;
    cssClass?: string;
    constructor(
        public id: number,
        public title: string,
        public start: Date,
        public end: Date,
        public infosSup: string,
        public color: EventColor,
        public resizable: { beforeStart?: boolean; afterEnd?: boolean; },
        public draggable: boolean
    ) {}
}
