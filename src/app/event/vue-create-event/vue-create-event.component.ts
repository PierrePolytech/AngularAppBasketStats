import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventService } from 'src/app/shared/event.service';
import { enumTypeEvent } from 'src/app/shared/enum/enumtypeevent';
import { DateAdapter, MatAutocomplete, MatAutocompleteSelectedEvent, MatChip } from '@angular/material';
import * as moment from 'moment';
import { EventJson } from 'src/app/shared/eventjson';
import { EquipeService } from 'src/app/shared/equipe.service';
import { Equipe } from 'src/app/shared/equipe';
import { Observable } from 'rxjs';
import { startWith, map, debounceTime } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-vue-create-event',
  templateUrl: './vue-create-event.component.html',
  styleUrls: ['./vue-create-event.component.css']
})
export class VueCreateEventComponent implements OnInit {

    eventForm = new FormGroup({
        title: new FormControl(''),
        startDate: new FormControl(''),
        startTime: new FormControl(''),
        endDate: new FormControl(''),
        endTime: new FormControl(''),
        infosSup: new FormControl(''),
        type: new FormControl(''),
    });

    typeEvents = enumTypeEvent;
    keysTypeEvent = [];
    @Input() equipe: Equipe;


    // autocompletion equipe
    equipeCtrl = new FormControl();
    filteredEquipes: Observable<Equipe[]>;
    @ViewChild('equipeInput') equipeInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    equipesEvent: any = [];
    equipesNotEvent: any = [];

    constructor(
        public eventService: EventService,
        public equipeService: EquipeService,
        private adapter: DateAdapter<any>
    ) {
        this.keysTypeEvent = Object.keys(this.typeEvents);
     }

    ngOnInit() {
        this.adapter.setLocale('fr');
        document.getElementById('div-semaine').hidden = true;
        this.loadEquipes();
        this.initFilteredValue();
    }

    onSubmit() {
        // init Date debut
        const dateDebut = new Date(this.eventForm.value.startDate);
        const heureDebut = this.eventForm.value.startTime.toString();
        dateDebut.setHours(heureDebut.substring(0, 2), heureDebut.substring(3, 5));
        // init Date fin
        const dateFin = new Date(this.eventForm.value.endDate);
        const heureFin = this.eventForm.value.endTime.toString();
        dateFin.setHours(heureFin.substring(0, 2), heureFin.substring(3, 5));

        // create JSON
        const jsonEvent = new EventJson();
        jsonEvent.title = this.eventForm.value.title;
        jsonEvent.dateDebut = moment(dateDebut).format('YYYY-MM-DD HH:mm:ss');
        jsonEvent.dateFin = moment(dateFin).format('YYYY-MM-DD HH:mm:ss');
        jsonEvent.infosSup = this.eventForm.value.infosSup;
        jsonEvent.typeEvent = this.eventForm.value.type;
        this.equipesEvent.map(a => delete a.club);
        jsonEvent.equipes = this.equipesEvent;
        console.log(JSON.stringify(jsonEvent));
        /*this.eventService.createEvent(this.eventForm.value).subscribe(
            success => alert('Done'),
            error => alert(error)
        );*/
    }

    onChange(event) {
        document.getElementById('div-semaine').hidden = !event.checked;
    }

     loadEquipes() {
        this.equipeService.getAllEquipesFromClub(this.equipe.club.id).subscribe((data: {}) => {
            this.equipesNotEvent = data as Equipe[];
        });
    }

    private _filterEquipes(value: string): Equipe[] {
        const filterValue = value.toLowerCase();
        return this.equipesNotEvent.filter(equipe => equipe.nom.toLowerCase().includes(filterValue));
    }

    displayFn(equipe) {
        return equipe ? equipe.nom : undefined;
    }

    remove(equipe: Equipe): void {
        const index = this.equipesEvent.indexOf(equipe);
        if (index >= 0) {
            this.equipesNotEvent.push(this.equipesEvent[index]);
            this.equipesEvent.splice(index, 1);
        }
        this.initFilteredValue();
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.equipesEvent.push(event.option.value);
        const index = this.equipesNotEvent.indexOf(event.option.value);
        this.equipesNotEvent.splice(index, 1);
        this.initFilteredValue();
        this.equipeInput.nativeElement.value = '';
        this.equipeCtrl.setValue(null);
    }

    initFilteredValue() {
        this.filteredEquipes = this.equipeCtrl.valueChanges
        .pipe(
            startWith(null),
            map((equipe: string | null) => equipe ? this._filterEquipes(equipe) : this.equipesNotEvent.slice())
        );
    }

    selectChip(item: MatChip) {
        item.toggleSelected();
    }
}
