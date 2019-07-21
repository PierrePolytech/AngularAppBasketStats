import { Component, OnInit, Input } from '@angular/core';
import { Club } from 'src/app/shared/club';
import { Salle } from 'src/app/shared/salle';
import { SalleService } from 'src/app/shared/salle.service';
import { MatDialog } from '@angular/material';
import { VueAjoutSalleClubComponent } from 'src/app//salle/vue-ajout-salle-club/vue-ajout-salle-club.component';


@Component({
  selector: 'app-vue-parametre-club',
  templateUrl: './vue-parametre-club.component.html',
  styleUrls: ['./vue-parametre-club.component.css']
})
export class VueParametreClubComponent implements OnInit {
    @Input() club: Club;
    salles: Salle[];
    
    constructor(
        public salleService: SalleService,
        public dialogAjoutSalle: MatDialog,
    ) { }

    ngOnInit() {
        this.loadSalle();
    }
    
    loadSalle() {
        this.salleService.getAllSallesFromClub(this.club.id).subscribe((data: any) => {
            this.salles = data as Salle[];
        });
    }
    
    supprimer(salle) {
        this.salleService.deleteSalle(salle.id).subscribe((data: any) => {
            this.loadSalle();
        });
    }
    
    openCreateSalleClub() {
        const dialogModifEvent = this.dialogAjoutSalle.open(VueAjoutSalleClubComponent, {
            width: '50%',
            data: {club: this.club}
        });

        dialogModifEvent.afterClosed().subscribe(result => {
            this.loadSalle();
        });
    }
}
