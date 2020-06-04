import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListStandardComponent } from './admin-list-standard.component';

describe('AdminListStandardComponent', () => {
  let component: AdminListStandardComponent;
  let fixture: ComponentFixture<AdminListStandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListStandardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
