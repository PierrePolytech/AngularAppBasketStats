import { Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { EnumSport } from 'src/app/shared/enum/enumsport';
import { ClubService } from 'src/app/shared/club.service';
import { Ville } from 'src/app/shared/ville';
import { HttpClient } from '@angular/common/http';
import { VilleService } from 'src/app/shared/ville.service';
import { tap } from 'rxjs/operators';

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
        nom: new FormControl(''),
        codeClub: new FormControl(''),
        sport: new FormControl(''),
        villes: new FormControl('')
    });
    // Enum Sport (Basket, ...)
    sports = EnumSport;
    keysSports = [];
    villesApi: any;
    ville: Ville;

    constructor(
        public clubService: ClubService,
        public villeService: VilleService,
        private http: HttpClient
    ) {
        this.keysSports = Object.keys(this.sports);
    }

    ngOnInit() {
    }

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
            console.log(JSON.stringify(this.clubForm.value));
            this.clubService.createClub(this.clubForm.value).subscribe(
                success => alert('Done'),
                error => alert(error)
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
}
