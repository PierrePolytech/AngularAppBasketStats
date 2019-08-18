import { Component, OnInit } from '@angular/core';
import { ModalLoginComponent } from '../utilisateur/modal-login/modal-login.component';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/shared/user.service';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    connect : boolean;
    username: string;
    constructor(
        public dialogLogin: MatDialog,
        public userService: UserService
    ) { }

    ngOnInit() {
        this.userService.isLoggedIn.subscribe(
            data=> {
                this.connect = data;
                if(this.connect) {
                    const token = jwt_decode(localStorage.getItem("id_token"));
                    this.username =  token.username;
                }
            }
        );
    }
    
    openLoginModal(){
        const dialogLogin = this.dialogLogin.open(ModalLoginComponent, {
            width: '50%'
        });
    }
    
    deconnexion() {
        this.userService.deconnectUser();
    }
}
