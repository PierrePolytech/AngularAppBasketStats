import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { Ville } from 'src/app/shared/ville';

@Component({
  selector: 'app-autocompletecity',
  templateUrl: './autocompletecity.component.html',
  styleUrls: ['./autocompletecity.component.css']
})
export class AutocompletecityComponent implements OnInit {
    villeCtrl = new FormControl();
    filteredVilles: any;
    isLoading = false;
    villesChoisi: any = [];
    separatorKeysCodes: number[] = [ENTER, COMMA];
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    @ViewChild('villeInput') villeInput: ElementRef<HTMLInputElement>;
    @Output() eventVilles = new EventEmitter<any>();

    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.loadVilles();
    }

    loadVilles() {
        this.villeCtrl.valueChanges.pipe(
            debounceTime(500),
            tap(() => {
                this.filteredVilles = [];
                this.isLoading = true;
            }),
            switchMap(
                value => this.http.
                get('https://geo.api.gouv.fr/communes?nom=' + value + '&fields=nom,codesPostaux,departement,region&format=json')
                    .pipe(
                        finalize(() => {
                            this.isLoading = false;
                        }),
                    )
            )
        ).subscribe(
            data => {
                this.filteredVilles = data;
            }
        );
    }

    remove(ville: any): void {
        const index = this.villesChoisi.indexOf(ville);
        if (index >= 0) {
            this.villesChoisi.splice(index, 1);
        }
        this.eventVilles.emit(this.villesChoisi);
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.villesChoisi.push(event.option.value);
        this.villeInput.nativeElement.value = '';
        this.villeCtrl.setValue(null);
        this.eventVilles.emit(this.villesChoisi);
    }
}
