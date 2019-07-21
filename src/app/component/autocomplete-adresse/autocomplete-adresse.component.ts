import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';

@Component({
  selector: 'app-autocomplete-adresse',
  templateUrl: './autocomplete-adresse.component.html',
  styleUrls: ['./autocomplete-adresse.component.css']
})
export class AutocompleteAdresseComponent implements OnInit {
    adresseCtrl = new FormControl();
    filteredAdresses: any;
    isLoading = false;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    @ViewChild('auto') matAutocomplete: MatAutocomplete;
    @ViewChild('adresseInput') villeInput: ElementRef<HTMLInputElement>;
    @Output() eventAdresse = new EventEmitter<any>();
    
    
    constructor(
        private http: HttpClient
    ) { }

    ngOnInit() {
      this.loadAdresses();
    }
    
    loadAdresses() {
           this.adresseCtrl.valueChanges.pipe(
            debounceTime(500),
            tap(() => {
                this.filteredAdresses = [];
                this.isLoading = true;
            }),
            switchMap(
                value => this.http.
                get('https://api-adresse.data.gouv.fr/search/?q=' + value)
                    .pipe(
                        finalize(() => {
                            this.isLoading = false;
                        })
                    )
            )
        ).subscribe(
            (data: any) => {
                this.filteredAdresses = data.features;
            }
        );   
    }
    
    selected(event: MatAutocompleteSelectedEvent): void {
        this.eventAdresse.emit(event.option.value);
    }
    
    displayFn(adresse?: any): string | undefined {
        return adresse ? adresse.properties.label : undefined;
    }
}
