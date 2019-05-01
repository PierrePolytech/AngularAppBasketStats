import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueJoueurOfClubComponent } from './vue-joueur-of-club.component';

describe('VueJoueurOfClubComponent', () => {
  let component: VueJoueurOfClubComponent;
  let fixture: ComponentFixture<VueJoueurOfClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueJoueurOfClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueJoueurOfClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
