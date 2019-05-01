import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {JoueurService} from '../../shared/joueur.service';

@Component({
  selector: 'app-vue-joueur-of-equipe',
  templateUrl: './vue-joueur-of-equipe.component.html',
  styleUrls: ['./vue-joueur-of-equipe.component.css']
})
export class VueJoueurOfEquipeComponent implements OnInit {
    Joueur: any = [];
    constructor(
        private route: ActivatedRoute,
        public joueurService: JoueurService
    ) { }

    ngOnInit() {
        this.loadJoueurs();
    }

    loadJoueurs() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.joueurService.getAllJoueursFromEquipe(id).subscribe((data: {}) => {
            this.Joueur = data;
        });
    }

}
