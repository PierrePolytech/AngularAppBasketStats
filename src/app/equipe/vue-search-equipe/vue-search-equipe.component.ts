import { Component, OnInit } from '@angular/core';
import { EquipeService } from '../../shared/equipe.service';

@Component({
  selector: 'app-vue-search-equipe',
  templateUrl: './vue-search-equipe.component.html',
  styleUrls: ['./vue-search-equipe.component.css']
})
export class VueSearchEquipeComponent implements OnInit {

    Equipe: any = [];

    constructor(
        public equipeService: EquipeService
    ) { }

    ngOnInit() {
        this.loadEquipes('');
    }

    loadEquipes(nom) {
        return this.equipeService.searchEquipe(nom).subscribe((data: {}) => {
            this.Equipe = data;
        });
    }

    deleteEquipe(id) {
        if (window.confirm('Are you sure, you want to delete?')) {
            this.equipeService.deleteEquipe(id).subscribe(data => {
                this.loadEquipes('');
            });
        }
    }
}
