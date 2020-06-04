import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../models/Course';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-edit-course',
  templateUrl: './user-edit-course.component.html',
  styleUrls: ['./user-edit-course.component.scss']
})
export class UserEditCourseComponent implements OnInit, OnDestroy {

  courseId: number;
  course: Course;
  loading: boolean;
  showSection: number;
  subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit() {
    this.loading = true;
    this.showSection = 1;
    this.setId();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Get course ID from router param and set to local variable
   */
  setId() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.courseId = +params.get('id');
        this.getCourse();
      },
      error => { console.error(error); },
      () => {
      }
    );
  }

  getCourse() {
    this.subscriptions.push(this.courseService.get(this.courseId).subscribe(response => {
      if (response.status === 200) {
        this.course = response.payload[0];
      } else {
        console.error(response.status);
      }
      this.loading = false;
    }));
  }

  changeSection(section: number) {
    this.showSection = section;
  }

}
