import { Component, OnInit } from '@angular/core';
import { CourseListing } from '../models/CourseListing';
import { CourseService } from '../services/course.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-list-standard',
  templateUrl: './admin-list-standard.component.html',
  styleUrls: ['./admin-list-standard.component.scss']
})
export class AdminListStandardComponent implements OnInit {

  showText: string;
  masterList: CourseListing[];
  standardCourses: CourseListing[];
  numCourses: number;
  subscriptions: Subscription[] = [];

  constructor(
    private courseService: CourseService,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.showText = 'more';
    this.numCourses = 0;
    this.getCourses();
  }

  refineList(text: string) {
    this.standardCourses = [];
    if (text === '') {
      this.standardCourses = this.masterList;
    } else {
      this.standardCourses = this.masterList.filter((course) => {
        if (course.fullName.toLowerCase().startsWith(text.toLowerCase())) {
          return course;
        }
      });
    }
  }

  getCourses() {
    this.subscriptions.push(this.courseService.getAll().subscribe(response => {
      if (response.status === 200) {
        this.standardCourses = response.payload;
        this.masterList = response.payload;
        this.numCourses = this.standardCourses.length;
      } else {
        console.error(response);
      }
    }));
  }

  changeInfo() {
    if (this.showText === 'more') {
      this.showText = 'less';
    } else {
      this.showText = 'more';
    }
  }

  /**
   * Go to the editing screen for the course
   * @param id ID of course
   */
  goToEdit(id) {
    this.router.navigate(['/admin/standard/edit', id]);
  }

  delete(id, name)  {
    if (prompt('Are you sure you want to delete this course: ' + name + '? Type DELETE to confirm.') === 'DELETE') {
      this.subscriptions.push(this.courseService.deleteStandardCourse(id.toString()).subscribe(response => {
        if (response.status === 200) {
          this.standardCourses = this.standardCourses.filter( x => +x.id !== +id);
          this.snackbar.open('Course deleted successfully!', '', { duration: 1200 });
        } else {
          console.error(response);
        }
      }));
    }
  }

}
