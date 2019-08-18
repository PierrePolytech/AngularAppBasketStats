import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueEventOfJoueurComponent } from './vue-event-of-joueur.component';

describe('VueEventOfJoueurComponent', () => {
  let component: VueEventOfJoueurComponent;
  let fixture: ComponentFixture<VueEventOfJoueurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueEventOfJoueurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueEventOfJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
