import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditCourseComponent } from './user-edit-course.component';

describe('UserEditCourseComponent', () => {
  let component: UserEditCourseComponent;
  let fixture: ComponentFixture<UserEditCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
