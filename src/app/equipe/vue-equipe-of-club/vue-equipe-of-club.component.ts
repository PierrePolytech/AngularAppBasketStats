import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EquipeService} from '../../shared/equipe.service';
import {MatPaginator, MatTableDataSource, MatSort, MatDialog, MatPaginatorIntl} from '@angular/material';
import { Equipe } from 'src/app/shared/equipe';
import { Club } from 'src/app/shared/club';
import { VueCreateEquipeComponent } from '../vue-create-equipe/vue-create-equipe.component';
import { FrenchMatPaginatorIntl } from 'src/app/component/language/frenchmatpaginatorintl';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-vue-equipe-of-club',
  templateUrl: './vue-equipe-of-club.component.html',
  styleUrls: ['./vue-equipe-of-club.component.css'],
  providers: [
      {provide: MatPaginatorIntl, useClass: FrenchMatPaginatorIntl}
  ]
})
export class VueEquipeOfClubComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['nom', 'category', 'sexe', 'division', 'poule', 'details'];
    dataTable = new MatTableDataSource<Equipe>();

    @Input() club: Club;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    // filter
    globalFilter = '';
    nomFilter = new FormControl();
    categorieFilter = new FormControl('Tous');
    sexeFilter = new FormControl('Tous');
    niveauFilter = new FormControl('Tous');

    filteredValues = {
        nom: '',
        categorie: '',
        sexe: '',
        niveau: ''
    };

    constructor(
        private route: ActivatedRoute,
        public equipeService: EquipeService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        // Initialisation des filtres
        this.initialisationFiltres();
    }
    ngAfterViewInit(): void {
        this.loadEquipes();
    }

    loadEquipes() {
        this.equipeService.getAllEquipesFromClub(this.club.id).subscribe((data: {}) => {
            this.dataTable.data = data as Equipe[];
        });
        this.dataTable.paginator = this.paginator;
        this.dataTable.sort = this.sort;
        this.dataTable.filterPredicate = (data: Equipe, filtersJson: string) => {
            const searchString = JSON.parse(filtersJson);
            return data.nom.toString().toLowerCase().includes(searchString.nom.toLowerCase()) &&
                data.category.toString().toLowerCase().includes(searchString.categorie.toLowerCase()) &&
                data.sexe.toString().toLowerCase().includes(searchString.sexe.toLowerCase()) &&
                data.niveau.toString().toLowerCase().includes(searchString.niveau.toLowerCase());
        };
    }

    initialisationFiltres() {
        this.nomFilter.valueChanges.subscribe((FilterValue) => {
            this.filtre(FilterValue, 'nom');
        });
        this.categorieFilter.valueChanges.subscribe((FilterValue) => {
            this.filtre(FilterValue, 'categorie');
        });
        this.niveauFilter.valueChanges.subscribe((FilterValue) => {
            this.filtre(FilterValue, 'niveau');
        });
        this.sexeFilter.valueChanges.subscribe((FilterValue) => {
            this.filtre(FilterValue, 'sexe');
        });
    }

    openCreateEquipeDialog() {
        const dialogCreateEquipe = this.dialog.open(VueCreateEquipeComponent, {
            width: '50%',
            data: {club: this.club}
        });

        dialogCreateEquipe.afterClosed().subscribe(result => {
            this.loadEquipes();
        });
    }

    filtre(filterValue: string, nomColumn: string) {
        if (filterValue === 'Tous') {
            filterValue = '';
        }
        this.filteredValues[nomColumn] = filterValue;
        this.dataTable.filter = JSON.stringify(this.filteredValues);
        if (this.dataTable.paginator) {
            this.dataTable.paginator.firstPage();
        }
    }
}
