import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUnapprovedListComponent } from './admin-unapproved-list.component';

describe('AdminUnapprovedListComponent', () => {
  let component: AdminUnapprovedListComponent;
  let fixture: ComponentFixture<AdminUnapprovedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUnapprovedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUnapprovedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
