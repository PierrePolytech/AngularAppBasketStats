import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueEditEquipeComponent } from './vue-edit-equipe.component';

describe('VueEditEquipeComponent', () => {
  let component: VueEditEquipeComponent;
  let fixture: ComponentFixture<VueEditEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueEditEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueEditEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
