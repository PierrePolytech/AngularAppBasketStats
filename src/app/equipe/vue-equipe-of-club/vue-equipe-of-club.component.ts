import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EquipeService} from '../../shared/equipe.service';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { Equipe } from 'src/app/shared/equipe';
import { Club } from 'src/app/shared/club';

@Component({
  selector: 'app-vue-equipe-of-club',
  templateUrl: './vue-equipe-of-club.component.html',
  styleUrls: ['./vue-equipe-of-club.component.css']
})
export class VueEquipeOfClubComponent implements OnInit {
    displayedColumns: string[] = ['nom', 'category', 'sexe', 'division', 'poule', 'details'];
    dataTable = new MatTableDataSource<Equipe>();

    @Input() club: Club;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private route: ActivatedRoute,
        public equipeService: EquipeService
    ) { }

    ngOnInit() {
        this.loadEquipes();
    }

    loadEquipes() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.equipeService.getAllEquipesFromClub(id).subscribe((data: {}) => {
            this.dataTable.data = data as Equipe[];
        });
        this.dataTable.paginator = this.paginator;
        this.dataTable.sort = this.sort;
        this.dataTable.filterPredicate = (data: Equipe, filtersJson: string) => {
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
