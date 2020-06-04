import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListBasicComponent } from './admin-list-basic.component';

describe('AdminListBasicComponent', () => {
  let component: AdminListBasicComponent;
  let fixture: ComponentFixture<AdminListBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
