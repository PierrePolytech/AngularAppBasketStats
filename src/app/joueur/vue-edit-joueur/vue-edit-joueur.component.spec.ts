import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueEditJoueurComponent } from './vue-edit-joueur.component';

describe('VueEditJoueurComponent', () => {
  let component: VueEditJoueurComponent;
  let fixture: ComponentFixture<VueEditJoueurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueEditJoueurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueEditJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
