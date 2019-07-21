import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatChip, DateAdapter, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Salle } from 'src/app/shared/salle';
import { Ville } from 'src/app/shared/ville';
import { Club } from 'src/app/shared/club';
import { VilleService } from 'src/app/shared/ville.service';
import { SalleService } from 'src/app/shared/salle.service';

@Component({
  selector: 'app-vue-ajout-salle-club',
  templateUrl: './vue-ajout-salle-club.component.html',
  styleUrls: ['./vue-ajout-salle-club.component.css']
})
export class VueAjoutSalleClubComponent implements OnInit {
    salleForm = new FormGroup({
        nom: new FormControl('')
    });
    
    salle: Salle;
    ville: Ville;
    
    constructor(
        public dialogRef: MatDialogRef<VueAjoutSalleClubComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public villeService: VilleService,
        public salleService: SalleService
    ) { 
        this.salle = new Salle();
    }

    ngOnInit() {
    
    }
    
    onSubmit() {
        this.villeService.createVille(this.ville).toPromise().then(
            (data: Ville) => {
                this.salle.nom = this.salleForm.value.nom;
                this.salle.ville = data;
                this.salle.clubSalle = new Club(this.data.club.id);
                this.salleService.createSalle(this.salle).subscribe(
                    success => this.dialogRef.close(),
                    error => alert(error)
                );
            }
        );
    }
    
    getAdresse(data){
        this.salle.numRue = data.properties.housenumber;
        this.salle.adresse = data.properties.street;
        this.ville = new Ville();
        this.ville.nom = data.properties.city;
        this.ville.codePostal = data.properties.postcode;
        this.ville.pays = 'FRANCE';
    }
    
    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
}
