import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ClubService} from '../../shared/club.service';
import {Club} from '../../shared/club';

@Component({
  selector: 'app-vue-interne-club',
  templateUrl: './vue-interne-club.component.html',
  styleUrls: ['./vue-interne-club.component.css']
})
export class VueInterneClubComponent implements OnInit {

    club: Club;
    affichageMenu: string;
    constructor(
        private route: ActivatedRoute,
        public clubService: ClubService
    ) { }

    ngOnInit() {
       this.getClub();
       this.affichageMenu = 'Equipes';
    }

    getClub() {
        const url = this.route.snapshot.params.url;
        this.clubService.getClubByURL(url).subscribe(club => this.club = club);
    }

    getAffichageActus() {
        this.affichageMenu = 'Actus';
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

    getAffichageEquipes() {
        this.affichageMenu = 'Equipes';
    }
    
    getAffichageParametre() {
        this.affichageMenu = 'Parametre';
    }
}
