import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { EnumSport } from 'src/app/shared/enum/enumsport';
import { ClubService } from 'src/app/shared/club.service';
import { VilleService } from 'src/app/shared/ville.service';
import { ConfigurationService } from 'src/app/shared/configuration/configuration.service';
import { Ville } from 'src/app/shared/ville';
import { Sport } from 'src/app/shared/configuration/sport';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { ErrorStateMatcherOnBlur }  from 'src/app/component/validator/errorstatematcheronblur';

interface RetourApi {
    nom: string;
    code: number;
}


@Component({
  selector: 'app-vue-create-club',
  templateUrl: './vue-create-club.component.html',
  styleUrls: ['./vue-create-club.component.css']
})
export class VueCreateClubComponent implements OnInit {
    clubForm = new FormGroup({
        nomcomplet: new FormControl('',{validators : [Validators.required, Validators.minLength(3), Validators.maxLength(200)], updateOn: 'blur'}),
        nom: new FormControl('',{validators : [Validators.required, Validators.minLength(2), Validators.maxLength(200)], updateOn: 'blur'}),
        url: new FormControl('',{validators : [Validators.required, Validators.minLength(3), Validators.maxLength(15)]}),
        codeClub: new FormControl('',{validators : [Validators.required, Validators.minLength(2), Validators.maxLength(50)], updateOn: 'blur'}),
        sport: new FormControl('',{validators : [Validators.required], updateOn: 'blur'}),
        villes: new FormControl('')
    });
    // Enum Sport (Basket, ...)
    sports: Sport[] = [];
    villesApi: any;
    ville: Ville;
    urlexist: boolean;
    isLoading = false;

    constructor(
        public clubService: ClubService,
        public villeService: VilleService,
        public configurationService: ConfigurationService,
        private http: HttpClient,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadConfiguration();
    }
    
    // convenience getter for easy access to form fields
    get f() { return this.clubForm.controls; }

    onSubmit() {
        const listeVilles = [];
        const start = async () => {
            await this.asyncForEach(
                this.villesApi,
                async (villeApi) => {
                    this.ville = new Ville();
                    this.ville.nom = villeApi.nom;
                    if (villeApi.departement != null) {
                        this.ville.codeDepartement = villeApi.departement.code;
                        this.ville.departement = villeApi.departement.nom;
                    }
                    this.ville.codePostal = villeApi.codesPostaux[0];
                    this.ville.region = villeApi.region.nom;
                    this.ville.pays = 'FRANCE';
                    await this.villeService.createVille(this.ville).toPromise().then((data: Ville) => listeVilles.push(data));
                }
            );
            this.clubForm.value.villes = listeVilles;
            this.clubForm.value.url = this.clubForm.value.url.toLowerCase();
            this.clubService.createClub(this.clubForm.value).subscribe(
                data => this.router.navigate(['/club/' + data.id + '/interne']),
                error => console.log(error)
            );
        };
        start();
    }
    
    getVilles(data) {
        this.villesApi = data;
    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
    
    loadConfiguration() {
        return this.configurationService.getAllSports().subscribe((data: {}) => {
            this.sports = data as Sport[];
        });   
    }
    
    isExistURL(){
        this.clubService.existUrlClub(this.clubForm.value.url.toLowerCase()).subscribe(
            data => {if(data) this.f.url.setErrors({'urlexist': true});},
            error => console.log(error)
        )
    }
}
