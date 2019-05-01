import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueInterneEquipeComponent } from './vue-interne-equipe.component';

describe('VueInterneEquipeComponent', () => {
  let component: VueInterneEquipeComponent;
  let fixture: ComponentFixture<VueInterneEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueInterneEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueInterneEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
