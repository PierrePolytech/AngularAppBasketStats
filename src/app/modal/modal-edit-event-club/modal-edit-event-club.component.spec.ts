import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditEventClubComponent } from './modal-edit-event-club.component';

describe('ModalEditEventClubComponent', () => {
  let component: ModalEditEventClubComponent;
  let fixture: ComponentFixture<ModalEditEventClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditEventClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditEventClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
