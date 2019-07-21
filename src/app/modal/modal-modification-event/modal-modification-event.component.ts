import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Club } from 'src/app/shared/club';
import { Equipe } from 'src/app/shared/equipe';
import { enumTypeEvent } from 'src/app/shared/enum/enumtypeevent';
import { EventService } from 'src/app/shared/event.service';
import { EventJson } from 'src/app/shared/eventjson';
import * as moment from 'moment';
import { Event } from 'src/app/shared/event';

@Component({
  selector: 'app-modal-modification-event',
  templateUrl: './modal-modification-event.component.html',
  styleUrls: ['./modal-modification-event.component.css']
})
export class ModalModificationEventComponent implements OnInit {
    
    event: Event;
    newStart: string;
    newEnd: string;
    
    constructor(
        public dialogRef: MatDialogRef<ModalModificationEventComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public eventService: EventService
    ) { 
        this.event= data.event.meta.eventDb;
        this.newStart= data.newStart;
        this.newEnd= data.newEnd;
    }
    
    ngOnInit() {
    }
    
    annuler(): void {
        this.dialogRef.close(false);
    }
    
    confirmer(): void {
        const jsonEvent = new EventJson();
        jsonEvent.id = this.event.id;
        jsonEvent.title = this.event.title;
        jsonEvent.infosSup = this.event.infosSup;
        jsonEvent.typeEvent = this.event.type;
        jsonEvent.clubs = this.event.clubs.map((club: any) => {
            if(club.id !=null){
                return new Club(club.id);
            }else{
                return new Club(club);
            }
        });
        jsonEvent.equipes = this.event.equipes.map((equipe: any) => {
            if(equipe.id !=null){
                return new Equipe(equipe.id);
            }else{
                return new Equipe(equipe);
            }
        });
        jsonEvent.recurent = this.event.recurent;
        // Init des dates modifiée
        const dateDebutModif = moment(this.newStart, moment.ISO_8601).add(moment().utcOffset(), 'minutes');
        const dateFinModif = moment(this.newEnd, moment.ISO_8601).add(moment().utcOffset(), 'minutes');
        
        if (this.event.recurent) {
            jsonEvent.freq = this.event.freq;
            jsonEvent.byweekday = this.event.byweekday;
            const dateDebutEvent = new Date(this.event.start);
            dateDebutEvent.setHours(dateDebutModif.hours(), dateDebutModif.minutes());
            const dateFinEvent = new Date(this.event.end);
            dateFinEvent.setHours(dateFinModif.hours(), dateFinModif.minutes());
            
            jsonEvent.dateDebut = dateDebutEvent.toISOString();
            jsonEvent.dateFin = dateFinEvent.toISOString();
        } else {
            jsonEvent.dateDebut = dateDebutModif.toISOString();
            jsonEvent.dateFin = dateFinModif.toISOString();
        }
        this.eventService.updateEvent(jsonEvent).subscribe(
            success => this.dialogRef.close(true),
            error => alert(error)
        );
    }
    
    onNoClick(): void {
        this.dialogRef.close(false);
    }
}
