import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddStandardComponent } from './admin-add-standard.component';

describe('AdminAddStandardComponent', () => {
  let component: AdminAddStandardComponent;
  let fixture: ComponentFixture<AdminAddStandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddStandardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
