import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBasicCourseComponent } from './add-basic-course.component';

describe('AddBasicCourseComponent', () => {
  let component: AddBasicCourseComponent;
  let fixture: ComponentFixture<AddBasicCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBasicCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBasicCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
