import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModificationEventComponent } from './modal-modification-event.component';

describe('ModalModificationEventComponent', () => {
  let component: ModalModificationEventComponent;
  let fixture: ComponentFixture<ModalModificationEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalModificationEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModificationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
