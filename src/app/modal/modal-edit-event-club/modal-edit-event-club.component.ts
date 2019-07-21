import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Club } from 'src/app/shared/club';
import { Event } from 'src/app/shared/event';
import { enumTypeEvent } from 'src/app/shared/enum/enumtypeevent';
import { EventService } from 'src/app/shared/event.service';
import { EventJson } from 'src/app/shared/eventjson';
import * as moment from 'moment';
import * as momentTimezone from 'moment-timezone';
import { MatChip, DateAdapter, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChipDays } from 'src/app/shared/chipdays';


@Component({
  selector: 'app-modal-edit-event-club',
  templateUrl: './modal-edit-event-club.component.html',
  styleUrls: ['./modal-edit-event-club.component.css']
})
export class ModalEditEventClubComponent implements OnInit {
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
    
    chipsDays: ChipDays[] = [
        {id:'chiplundi', label:'Lundi' , value:'MO' , selected:false },
        {id:'chipMardi' , label:'Mardi' , value:'TU' , selected:false },
        {id:'chipMercredi' , label:'Mercredi' , value:'WE' , selected:false },
        {id:'chipJeudi' , label:'Jeudi' , value:'TH' , selected:false },
        {id:'chipVendredi' , label:'Vendredi' , value:'FR' , selected:false },
        {id:'chipSamedi' , label:'Samedi' , value:'SA' , selected:false },
        {id:'chipDimanche' , label:'Dimanche' , value:'SU' , selected:false },
    ];
    
    
    joursSelected = [];

    typeEvents = enumTypeEvent;
    keysTypeEvent = [];
    
    event: Event;
    
    constructor(
        public eventService: EventService,
        private adapter: DateAdapter<any>,
        public dialogRef: MatDialogRef<ModalEditEventClubComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.keysTypeEvent = Object.keys(this.typeEvents);
        this.event= data.event.meta.eventDb;
    }

    ngOnInit() {
        this.adapter.setLocale('fr');
        if(!this.event.recurent) {
            document.getElementById('div-semaine').hidden = true;
        }
        this.initFormControl();
        this.initChip();
    }

    onChange(event) {
        document.getElementById('div-semaine').hidden = !event.checked;
    }

    selectChip(item: ChipDays) {
        const index = this.chipsDays.indexOf(item);
        this.chipsDays[index].selected = !item.selected;
        this.updateJoursSelect(item);
    }

    onNoClick(): void {
        this.dialogRef.close(false);
    }

    annuler(): void {
        this.dialogRef.close(false);
    }
    
    initFormControl() {
        this.eventForm.setValue({
            title: this.event.title,
            startDate: this.event.start,
            startTime: moment(this.event.start).format("HH:mm:ss"),
            endDate: this.event.end,
            endTime: moment(this.event.end).format("HH:mm:ss"),
            infosSup: this.event.infosSup,
            type: this.event.type,
            recurent: this.event.recurent!=null?this.event.recurent:false
        });
    }
    
    initChip() {
        if(this.event.recurent) {
            this.event.byweekday.split(',').forEach(element => {
                this.chipsDays.forEach(chip =>{
                    if(element == chip.value){
                        const index = this.chipsDays.indexOf(chip);
                        this.chipsDays[index].selected = !chip.selected;
                        this.updateJoursSelect(chip);
                    }   
                });
            });
        }
    }
    
    updateJoursSelect(item: ChipDays) {
        if (item.selected) {
            this.joursSelected.push(item.value);
        } else {
            const index = this.joursSelected.indexOf(item.value);
            this.joursSelected.splice(index, 1);
        }
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
        jsonEvent.id = this.event.id;
        jsonEvent.title = this.eventForm.value.title;
        jsonEvent.dateDebut = moment(dateDebut).toISOString();
        jsonEvent.dateFin = moment(dateFin).toISOString();
        jsonEvent.infosSup = this.eventForm.value.infosSup;
        jsonEvent.typeEvent = this.eventForm.value.type;
        jsonEvent.clubs = this.event.clubs.map((club: any) => {
            if(club.id !=null){
                return new Club(club.id);
            }else{
                return new Club(club);
            }
        });
        jsonEvent.recurent = this.eventForm.value.recurent;
        if (this.eventForm.value.recurent) {
            jsonEvent.freq = 'WEEKLY';
            jsonEvent.byweekday = this.joursSelected.toString();
        } 
        this.eventService.updateEvent(jsonEvent).subscribe(
            success => this.dialogRef.close(true),
            error => alert(error)
        );
    }
}
