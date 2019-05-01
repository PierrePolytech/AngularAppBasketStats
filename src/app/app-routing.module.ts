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
import { VueCreateEquipeComponent } from './equipe/vue-create-equipe/vue-create-equipe.component';
import { VueEditEquipeComponent } from './equipe/vue-edit-equipe/vue-edit-equipe.component';
import { VueExterneEquipeComponent } from './equipe/vue-externe-equipe/vue-externe-equipe.component';
import { VueInterneEquipeComponent } from './equipe/vue-interne-equipe/vue-interne-equipe.component';
import { VueSearchEquipeComponent } from './equipe/vue-search-equipe/vue-search-equipe.component';


// import Joueur
import { VueCreateJoueurComponent } from './joueur/vue-create-joueur/vue-create-joueur.component';
import { VueEditJoueurComponent } from './joueur/vue-edit-joueur/vue-edit-joueur.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'clubs' },

    { path: 'club/create', component: VueCreateClubComponent },
    { path: 'clubs', component: VueSearchClubComponent },
    { path: 'club/:id', component: VueEditClubComponent },
    { path: 'club/:id/interne', component: VueInterneClubComponent },
    { path: 'club/:id/externe', component: VueExterneClubComponent },

    { path: 'club/:id/equipe/create', component: VueCreateEquipeComponent },
    { path: 'equipes', component: VueSearchEquipeComponent },
    { path: 'equipe/:id', component: VueEditEquipeComponent },
    { path: 'equipe/:id/interne', component: VueInterneEquipeComponent },
    { path: 'equipe/:id/externe', component: VueExterneEquipeComponent },

    { path: 'joueur/create', component: VueCreateJoueurComponent },
    { path: 'joueur/:id', component: VueEditJoueurComponent }
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
