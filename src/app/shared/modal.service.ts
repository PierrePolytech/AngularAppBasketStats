import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ModalLoginComponent } from '../modal/modal-login/modal-login.component';
import { ModalInscriptionComponent } from '../modal/modal-inscription/modal-inscription.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    public dialog: MatDialog
  ) { }
    
  openLoginModal() {
    const dialogLogin = this.dialog.open(ModalLoginComponent, {
        width: '30%'
    });
  }
    
  openInscriptionModal() {
    const dialogInscription = this.dialog.open(ModalInscriptionComponent, {
        width: '30%'
    });
  }
}
