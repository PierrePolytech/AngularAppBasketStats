import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueSearchEquipeComponent } from './vue-search-equipe.component';

describe('VueSearchEquipeComponent', () => {
  let component: VueSearchEquipeComponent;
  let fixture: ComponentFixture<VueSearchEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueSearchEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueSearchEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
