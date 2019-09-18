import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { JoueurService } from 'src/app/shared/joueur.service';
import { Joueur } from 'src/app/shared/joueur';
import { User } from 'src/app/shared/user';
import * as moment from 'moment';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'app-vue-inscription-utilisateur',
  templateUrl: './vue-inscription-utilisateur.component.html',
  styleUrls: ['./vue-inscription-utilisateur.component.css']
})
export class VueInscriptionUtilisateurComponent implements OnInit {
    inscriptionForm = new FormGroup({
        nom: new FormControl('',{validators : [Validators.required, Validators.minLength(2), Validators.maxLength(200)], updateOn: 'blur'}),
        prenom: new FormControl('',{validators : [Validators.required, Validators.minLength(2), Validators.maxLength(200)], updateOn: 'blur'}),
        email: new FormControl('',{validators : [Validators.required], updateOn: 'blur'}),
        identifiant: new FormControl('',{validators : [Validators.required, Validators.minLength(2), Validators.maxLength(50)], updateOn: 'blur'}),
        motdepasse: new FormControl('',{validators : [Validators.required, Validators.minLength(6), Validators.maxLength(200)], updateOn: 'blur'}),
        datenaissance: new FormControl('',{validators : [Validators.required], updateOn: 'blur'}),
        sexe: new FormControl('',{validators : [Validators.required], updateOn: 'blur'}),
    });
    
    get f() { return this.inscriptionForm.controls; }
    
    constructor(
        private adapter: DateAdapter<any>,
        public userService: UserService,
        public joueurService: JoueurService
    ) { }

    ngOnInit() {
        this.adapter.setLocale('fr');
    }
  
    onSubmit() {
        const joueur = new Joueur();
        joueur.nom = this.inscriptionForm.value.nom;    
        joueur.prenom = this.inscriptionForm.value.prenom;
        joueur.dateNaissance = moment(this.inscriptionForm.value.datenaissance).format("DD-MM-YYYY");
        joueur.sexe = this.inscriptionForm.value.sexe;
        this.joueurService.createJoueur(joueur).toPromise().then(
            (data: Joueur) => {
                const user = new User();
                user.identifiant = this.inscriptionForm.value.identifiant;
                user.email = this.inscriptionForm.value.email;
                user.motdepasse = this.inscriptionForm.value.motdepasse;
                user.joueur = data;
                this.userService.createUser(user).subscribe(
                    data => alert(data),
                    error => alert(error)
                );
            }
        );
      
    }

}
