import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApprovedListComponent } from './admin-approved-list.component';

describe('AdminApprovedListComponent', () => {
  let component: AdminApprovedListComponent;
  let fixture: ComponentFixture<AdminApprovedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApprovedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApprovedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
