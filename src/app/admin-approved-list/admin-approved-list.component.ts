import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CourseListing } from '../models/CourseListing';
import { CourseService } from '../services/course.service';
import { Subscription } from 'rxjs';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-approved-list',
  templateUrl: './admin-approved-list.component.html',
  styleUrls: ['./admin-approved-list.component.scss']
})
export class AdminApprovedListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  dialogRef: MatDialogRef<any>;
  courses: CourseListing[];
  numOfCourses: number;

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
        this.courses = courses.filter(x => x.approval === 'approved');
        this.numOfCourses = this.courses.length;
      } else {
        console.error(response);
      }
    }, error => {
        console.error('Error' + error);
    }));
  }

  /**
   * View the listing in a pop up window. We build a course obj with just id here just because thats what the component expects as input
   * @param id course ID
   */
  viewCourse(dialog, id: number) {
    this.dialogRef = this.dialog.open(dialog, { data: id });
  }

  close() {
    this.dialogRef.close();
  }

  /**
   * Change the approval status of a course listing back to 'waiting', meaning it won't appear in list
   * @param id Golfcourse ID
   */
  upapprove(id) {
    this.subscriptions.push(this.courseService.updateOne(id, 'approval', 'waiting').subscribe(response => {
      if (response.status === 200) {
        this.snackbar.open('Course removed from approved list.', '', { duration: 1200 });
        this.getCourses();
      } else {
        alert('Sorry, there was an error with approving the course.');
        console.error(response);
      }
    }));
  }

}
