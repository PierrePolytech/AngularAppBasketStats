import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueCreateEventComponent } from './vue-create-event.component';

describe('VueCreateEventComponent', () => {
  let component: VueCreateEventComponent;
  let fixture: ComponentFixture<VueCreateEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueCreateEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueCreateEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
