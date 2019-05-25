import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {JoueurService} from '../../shared/joueur.service';
import {MatPaginator, MatTableDataSource, MatSort, MatPaginatorIntl} from '@angular/material';
import { Joueur } from 'src/app/shared/joueur';
import { FrenchMatPaginatorIntl } from 'src/app/component/language/frenchmatpaginatorintl';

@Component({
  selector: 'app-vue-joueur-of-club',
  templateUrl: './vue-joueur-of-club.component.html',
  styleUrls: ['./vue-joueur-of-club.component.css'],
  providers: [
      {provide: MatPaginatorIntl, useClass: FrenchMatPaginatorIntl}
  ]
})
export class VueJoueurOfClubComponent implements OnInit {
    displayedColumns: string[] = ['nom', 'prenom', 'sexe', 'dateNaissance', 'details'];

    dataTable = new MatTableDataSource<Joueur>();

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private route: ActivatedRoute,
        public joueurService: JoueurService
    ) { }

    ngOnInit() {
        this.loadJoueurs();
    }

    loadJoueurs() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.joueurService.getAllJoueursFromClub(id).subscribe((data: {}) => {
            this.dataTable.data = data as Joueur[];
        });
        this.dataTable.paginator = this.paginator;
        this.dataTable.sort = this.sort;
        this.dataTable.filterPredicate = (data: Joueur, filtersJson: string) => {
            const matchFilter = [];
            const filters = JSON.parse(filtersJson);
            filters.forEach(filter => {
                const val = data[filter.id] === null ? '' : data[filter.id];
                matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
            });
            return matchFilter.every(Boolean);
        };
    }

    applyFilter(filterValue: string) {
        const tableFilters = [];
        tableFilters.push({
            id: 'nom',
            value: filterValue
        });
        this.dataTable.filter = JSON.stringify(tableFilters);
        if (this.dataTable.paginator) {
            this.dataTable.paginator.firstPage();
        }
    }

}
