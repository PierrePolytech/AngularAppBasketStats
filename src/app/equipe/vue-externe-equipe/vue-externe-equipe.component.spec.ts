import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueExterneEquipeComponent } from './vue-externe-equipe.component';

describe('VueExterneEquipeComponent', () => {
  let component: VueExterneEquipeComponent;
  let fixture: ComponentFixture<VueExterneEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueExterneEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueExterneEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
