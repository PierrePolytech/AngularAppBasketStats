import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Club } from 'src/app/shared/club';
import { enumTypeEvent } from 'src/app/shared/enum/enumtypeevent';
import { EventService } from 'src/app/shared/event.service';
import { EventJson } from 'src/app/shared/eventjson';
import * as moment from 'moment';
import { MatChip, DateAdapter, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-vue-create-event-of-club',
  templateUrl: './vue-create-event-of-club.component.html',
  styleUrls: ['./vue-create-event-of-club.component.css']
})
export class VueCreateEventOfClubComponent implements OnInit {
    eventForm = new FormGroup({
        title: new FormControl(''),
        startDate: new FormControl(''),
        startTime: new FormControl(''),
        endDate: new FormControl(''),
        endTime: new FormControl(''),
        infosSup: new FormControl(''),
        type: new FormControl(''),
        recurent: new FormControl('')
    });

    joursSelected = [];

    typeEvents = enumTypeEvent;
    keysTypeEvent = [];

    constructor(
        public eventService: EventService,
        private adapter: DateAdapter<any>,
        public dialogRef: MatDialogRef<VueCreateEventOfClubComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.keysTypeEvent = Object.keys(this.typeEvents);
    }

    ngOnInit() {
        this.adapter.setLocale('fr');
        document.getElementById('div-semaine').hidden = true;
    }
    
    onSubmit() {
        // init Date debut
        const dateDebut = new Date(this.eventForm.value.startDate);
        const heureDebut = this.eventForm.value.startTime.toString();
        dateDebut.setHours(parseInt(heureDebut.substring(0, 2))-(dateDebut.getTimezoneOffset())/60, heureDebut.substring(3, 5));
        // init Date fin
        const dateFin = new Date(this.eventForm.value.endDate);
        const heureFin = this.eventForm.value.endTime.toString();
        dateFin.setHours(parseInt(heureFin.substring(0, 2))-(dateFin.getTimezoneOffset())/60, heureFin.substring(3, 5));

        // create JSON
        const jsonEvent = new EventJson();
        jsonEvent.title = this.eventForm.value.title;
        jsonEvent.dateDebut = moment(dateDebut).toISOString();
        jsonEvent.dateFin = moment(dateFin).toISOString();
        jsonEvent.infosSup = this.eventForm.value.infosSup;
        jsonEvent.typeEvent = this.eventForm.value.type;
        jsonEvent.clubs = new Array(new Club(this.data.club.id));
        jsonEvent.recurent = this.eventForm.value.recurent;
        if (this.eventForm.value.recurent) {
            jsonEvent.freq = 'WEEKLY';
            jsonEvent.byweekday = this.joursSelected.toString();
        } 
        this.eventService.createEvent(jsonEvent).subscribe(
            success => this.dialogRef.close(true),
            error => alert(error)
        );
    }

    onChange(event) {
        document.getElementById('div-semaine').hidden = !event.checked;
    }

    selectChip(item: MatChip) {
        item.toggleSelected();
        if (item.selected) {
            this.joursSelected.push(item.value);
        } else {
            const index = this.joursSelected.indexOf(item.value);
            this.joursSelected.splice(index, 1);
        }
    }

    onNoClick(): void {
        this.dialogRef.close(false);
    }
}
