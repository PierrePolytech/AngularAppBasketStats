import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueJoueurOfEquipeComponent } from './vue-joueur-of-equipe.component';

describe('VueJoueurOfEquipeComponent', () => {
  let component: VueJoueurOfEquipeComponent;
  let fixture: ComponentFixture<VueJoueurOfEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueJoueurOfEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueJoueurOfEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
