import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CourseListing } from '../models/CourseListing';
import { CourseService } from '../services/course.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { CourseComponent } from '../course/course.component';

@Component({
  selector: 'app-admin-unapproved-list',
  templateUrl: './admin-unapproved-list.component.html',
  styleUrls: ['./admin-unapproved-list.component.scss']
})
export class AdminUnapprovedListComponent implements OnInit, OnDestroy {

  courses: CourseListing[];
  numOfCourses: number;
  dialogRef: MatDialogRef<CourseComponent>;
  subscriptions: Subscription[] = [];

  constructor(
    private courseService: CourseService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.numOfCourses = 0;
    this.getCourses();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  /**
   * Get all courses, just basic list info. Then filter to just those that are 'waiting' on approval
   */
  getCourses() {
    this.subscriptions.push(this.courseService.getAll().subscribe(response => {
      if (response.status === 200) {
        const courses = response.payload;
        this.courses = courses.filter(x => x.approval === 'waiting');
        this.numOfCourses = this.courses.length;
      } else {
        console.error(response);
      }
    }, error => {
        console.error('Error' + error);
    }));
  }

  /**
   * View the listing in a pop up window.
   * @param id course ID
   */
  viewCourse(dialog, id: number) {
    this.dialogRef = this.dialog.open(dialog, { data: id });
  }

  /**
   * Change a course to 'approved'. Approved by admin. Listings 'approved' will show in user search
   * @param id PK of the course record we are changing
   */
  approve(id: number) {
    this.subscriptions.push(this.courseService.updateOne(id, 'approval', 'approved').subscribe(response => {
      if (response.status === 200) {
        this.snackbar.open('Course Approved!', '', { duration: 1200 });
        this.getCourses();
      } else {
        alert('Sorry, there was an error with approving the course.');
        console.error(response);
      }
    }));
  }

  close() {
    this.dialogRef.close();
  }

}
