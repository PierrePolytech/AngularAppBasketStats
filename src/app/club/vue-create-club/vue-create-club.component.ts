import { AfterViewInit, Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { EnumSport } from 'src/app/shared/enum/enumsport';
import { ClubService } from 'src/app/shared/club.service';



@Component({
  selector: 'app-vue-create-club',
  templateUrl: './vue-create-club.component.html',
  styleUrls: ['./vue-create-club.component.css']
})
export class VueCreateClubComponent implements OnInit {
    clubForm = new FormGroup({
        nom: new FormControl(''),
        codeClub: new FormControl(''),
        sport: new FormControl(''),
        ville: new FormControl('')
    });
    // Enum Sport (Basket, ...)
    sports = EnumSport;
    keysSports = [];


    constructor(
        public clubService: ClubService
    ) {
        this.keysSports = Object.keys(this.sports);
    }

    ngOnInit() {
    }

    onSubmit() {
        this.clubService.createClub(this.clubForm.value).subscribe(
            success => alert('Done'),
            error => alert(error)
        );
    }
}
