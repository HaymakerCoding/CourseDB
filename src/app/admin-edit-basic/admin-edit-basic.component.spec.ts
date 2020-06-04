import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditBasicComponent } from './admin-edit-basic.component';

describe('AdminEditBasicComponent', () => {
  let component: AdminEditBasicComponent;
  let fixture: ComponentFixture<AdminEditBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
