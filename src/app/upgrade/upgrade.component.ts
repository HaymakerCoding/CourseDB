import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Course } from '../models/Course';
import { CourseListing } from '../models/CourseListing';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  loading: boolean;
  masterCourseList: CourseListing[];
  basicCourses: CourseListing[];

  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getBasicCourses();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Add in all the 'Basic' course listings, these have less info and no course page, just go to external website on select
   */
  getBasicCourses() {
    this.subscriptions.push(this.courseService.getAllBasicCourses().subscribe(response => {
      this.masterCourseList = [];
      response.payload.forEach(element => {
        this.masterCourseList.push(element);
        // sort the lists now that basic courses were added
        this.masterCourseList.sort((a, b) => {
          if (a.fullName.toLowerCase() === b.fullName.toLowerCase()) {
            return 0;
          }
          return (a.fullName.toLowerCase() < b.fullName.toLowerCase() ? -1 : 1);
        });
      });
      this.basicCourses = this.masterCourseList;
      this.loading = false;
    }));
  }

  /**
   * Filter the list of courses shown by the user input text
   * @param text User input text
   */
  refineList(text: string) {
    this.basicCourses = [];
    if (text === '') {
      this.basicCourses = this.masterCourseList;
    } else {
      this.basicCourses = this.masterCourseList.filter((course) => {
        if (course.fullName.toLowerCase().startsWith(text.toLowerCase())) {
          return course;
        }
      });
    }
  }

  upgrade(id) {
    if (confirm('Are you sure you want to upgrade this course?')) {
      alert('wip: ' + id);
    }
  }

}
