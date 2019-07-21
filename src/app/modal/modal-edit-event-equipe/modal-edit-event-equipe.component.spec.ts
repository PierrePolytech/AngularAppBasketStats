import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditEventEquipeComponent } from './modal-edit-event-equipe.component';

describe('ModalEditEventEquipeComponent', () => {
  let component: ModalEditEventEquipeComponent;
  let fixture: ComponentFixture<ModalEditEventEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditEventEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditEventEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
