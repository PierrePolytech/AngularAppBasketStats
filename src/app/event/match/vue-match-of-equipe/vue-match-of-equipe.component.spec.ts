import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueMatchOfEquipeComponent } from './vue-match-of-equipe.component';

describe('VueMatchOfEquipeComponent', () => {
  let component: VueMatchOfEquipeComponent;
  let fixture: ComponentFixture<VueMatchOfEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueMatchOfEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueMatchOfEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
