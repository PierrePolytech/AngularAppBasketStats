import { Component, OnInit } from '@angular/core';
import { Equipe } from 'src/app/shared/equipe';
import { Club } from 'src/app/shared/club';
import {EquipeService} from '../../shared/equipe.service';

@Component({
  selector: 'app-vue-equipe-of-joueur',
  templateUrl: './vue-equipe-of-joueur.component.html',
  styleUrls: ['./vue-equipe-of-joueur.component.css']
})
export class VueEquipeOfJoueurComponent implements OnInit {
  equipes: Equipe[];
  constructor(
    public equipeService: EquipeService
  ) { }

  ngOnInit() {
      this.loadMesEquipes();
  }
    
    loadMesEquipes(){
        this.equipeService.getMesEquipes().subscribe((data: {}) => {
            this.equipes = data as Equipe[];
        });
    }

}
