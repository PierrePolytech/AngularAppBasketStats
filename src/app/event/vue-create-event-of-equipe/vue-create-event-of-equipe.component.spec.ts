import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueCreateEventOfEquipeComponent } from './vue-create-event-of-equipe.component';

describe('VueCreateEventOfEquipeComponent', () => {
  let component: VueCreateEventOfEquipeComponent;
  let fixture: ComponentFixture<VueCreateEventOfEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueCreateEventOfEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueCreateEventOfEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
