import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
// import Club
import { VueInterneClubComponent } from './club/vue-interne-club/vue-interne-club.component';
import { VueSearchClubComponent } from './club/vue-search-club/vue-search-club.component';
import { VueExterneClubComponent } from './club/vue-externe-club/vue-externe-club.component';
import { VueEditClubComponent } from './club/vue-edit-club/vue-edit-club.component';
import { VueCreateClubComponent } from './club/vue-create-club/vue-create-club.component';

// import Equipe
import { VueEditEquipeComponent } from './equipe/vue-edit-equipe/vue-edit-equipe.component';
import { VueExterneEquipeComponent } from './equipe/vue-externe-equipe/vue-externe-equipe.component';
import { VueInterneEquipeComponent } from './equipe/vue-interne-equipe/vue-interne-equipe.component';
import { VueCreateEquipeComponent } from './equipe/vue-create-equipe/vue-create-equipe.component';


// import Joueur
import { VueCreateJoueurComponent } from './joueur/vue-create-joueur/vue-create-joueur.component';
import { VueEditJoueurComponent } from './joueur/vue-edit-joueur/vue-edit-joueur.component';

// import event
import { VueCreateEventOfClubComponent } from './event/vue-create-event-of-club/vue-create-event-of-club.component';
import { VueCreateEventOfEquipeComponent } from './event/vue-create-event-of-equipe/vue-create-event-of-equipe.component';
import { ModalModificationEventComponent } from './modal/modal-modification-event/modal-modification-event.component';
import { ModalEditEventClubComponent } from './modal/modal-edit-event-club/modal-edit-event-club.component';
import { ModalEditEventEquipeComponent } from './modal/modal-edit-event-equipe/modal-edit-event-equipe.component';

// import salle
import { VueAjoutSalleClubComponent } from './salle/vue-ajout-salle-club/vue-ajout-salle-club.component';
import { VueInscriptionUtilisateurComponent } from './utilisateur/vue-inscription-utilisateur/vue-inscription-utilisateur.component';
import { ModalLoginComponent } from './utilisateur/modal-login/modal-login.component';

// Pages connected
import { VueEventOfJoueurComponent } from './event/vue-event-of-joueur/vue-event-of-joueur.component';
import { VueEquipeOfJoueurComponent } from './equipe/vue-equipe-of-joueur/vue-equipe-of-joueur.component';
import { VueProfilUtilisateurComponent } from './utilisateur/vue-profil-utilisateur/vue-profil-utilisateur.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'clubs' },

    { path: 'club/create', component: VueCreateClubComponent },
    { path: 'clubs', component: VueSearchClubComponent },
    { path: 'club/:id', component: VueEditClubComponent },
    { path: 'club/:id/interne', component: VueInterneClubComponent },
    { path: 'club/:id/externe', component: VueExterneClubComponent },

    { path: 'equipe/create', component: VueCreateEquipeComponent },
    { path: 'equipe/:id', component: VueEditEquipeComponent },
    { path: 'equipe/:id/interne', component: VueInterneEquipeComponent },
    { path: 'equipe/:id/externe', component: VueExterneEquipeComponent },

    { path: 'joueur/create', component: VueCreateJoueurComponent },
    { path: 'joueur/:id', component: VueEditJoueurComponent },

    { path: 'event/club/create', component: VueCreateEventOfClubComponent },
    { path: 'event/equipe/create', component: VueCreateEventOfEquipeComponent },
    { path: 'event/modification', component: ModalModificationEventComponent },
    { path: 'event/club/edit', component: ModalEditEventClubComponent },
    { path: 'event/equipe/edit', component: ModalEditEventEquipeComponent },
    
    { path: 'salle/create', component: VueAjoutSalleClubComponent },
    
    { path: 'inscription', component: VueInscriptionUtilisateurComponent },
    
    { path: 'login', component: ModalLoginComponent },
    
    { path: 'mon-profil', component: VueProfilUtilisateurComponent },
    { path: 'mes-equipes', component: VueEquipeOfJoueurComponent },
    { path: 'mon-calendrier', component: VueEventOfJoueurComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
  ]
})

export class AppRoutingModule { }
