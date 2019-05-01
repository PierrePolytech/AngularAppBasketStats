import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EquipeService} from '../../shared/equipe.service';
import {Equipe} from '../../shared/equipe';


@Component({
  selector: 'app-vue-interne-equipe',
  templateUrl: './vue-interne-equipe.component.html',
  styleUrls: ['./vue-interne-equipe.component.css']
})
export class VueInterneEquipeComponent implements OnInit {
    equipe: Equipe;
    affichageMenu: string;

    constructor(
        private route: ActivatedRoute,
        public equipeService: EquipeService
    ) { }

    ngOnInit() {
        this.getEquipe();
        this.affichageMenu = 'Joueurs';
    }

    getEquipe() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.equipeService.getEquipe(id).subscribe(equipe => this.equipe = equipe);
    }

    getAffichageStats() {
        this.affichageMenu = 'Stats';
    }

    getAffichageCalendrier() {
        this.affichageMenu = 'Calendrier';
    }

    getAffichageJoueurs() {
        this.affichageMenu = 'Joueurs';
    }

    getAffichageMatchs() {
        this.affichageMenu = 'Matchs';
    }
}
