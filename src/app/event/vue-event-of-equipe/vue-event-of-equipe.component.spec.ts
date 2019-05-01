import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueEventOfEquipeComponent } from './vue-event-of-equipe.component';

describe('VueEventOfEquipeComponent', () => {
  let component: VueEventOfEquipeComponent;
  let fixture: ComponentFixture<VueEventOfEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueEventOfEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueEventOfEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
