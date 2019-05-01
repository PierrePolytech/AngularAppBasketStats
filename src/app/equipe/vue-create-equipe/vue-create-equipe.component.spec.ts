import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueCreateEquipeComponent } from './vue-create-equipe.component';

describe('VueCreateEquipeComponent', () => {
  let component: VueCreateEquipeComponent;
  let fixture: ComponentFixture<VueCreateEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueCreateEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueCreateEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
