import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditStandardComponent } from './admin-edit-standard.component';

describe('AdminEditStandardComponent', () => {
  let component: AdminEditStandardComponent;
  let fixture: ComponentFixture<AdminEditStandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditStandardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
