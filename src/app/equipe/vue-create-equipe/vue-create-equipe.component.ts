import { Component, OnInit, Inject } from '@angular/core';
import { EnumCategory } from 'src/app/shared/enum/enumcategory';
import { EnumNiveau } from 'src/app/shared/enum/enumniveau';
import { EnumSaison } from 'src/app/shared/enum/enumsaison';
import { EnumSexeEquipe } from 'src/app/shared/enum/enumsexeequipe';
import { EquipeService } from 'src/app/shared/equipe.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-vue-create-equipe',
  templateUrl: './vue-create-equipe.component.html',
  styleUrls: ['./vue-create-equipe.component.css']
})
export class VueCreateEquipeComponent implements OnInit {
    // Enum Niveau ( U9, U11)
    niveaux = EnumNiveau;
    keysNiveaux = [];
    // Enum Saison (2017/2018, ...)
    saisons = EnumSaison;
    keysSaisons = [];

    // Enum Sexe Equipe (Féminine ou Masculine)
    sexes = EnumSexeEquipe;
    keysSexes = [];

    // Enum Categorie ( Départemental,...)
    categories = EnumCategory;
    keysCategories = [];

    // Form
    equipeForm = new FormGroup({
        nom: new FormControl(''),
        saison: new FormControl(''),
        category: new FormControl(''),
        sexe: new FormControl(''),
        niveau: new FormControl(''),
        division: new FormControl(''),
        poule: new FormControl('')
    });

    constructor(
        public equipeService: EquipeService,
        public dialogRef: MatDialogRef<VueCreateEquipeComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.keysCategories = Object.keys(this.categories);
        this.keysNiveaux = Object.keys(this.niveaux);
        this.keysSaisons = Object.keys(this.saisons);
        this.keysSexes = Object.keys(this.sexes);
    }

    ngOnInit() {
    }

    onSubmit() {
        this.equipeService.createEquipeFromClub(this.equipeForm.value, this.data.club.id).subscribe(
            success => this.dialogRef.close(),
            error => alert(error)
        );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
