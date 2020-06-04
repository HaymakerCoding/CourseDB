import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CourseService } from '../services/course.service';
import { ReviewService } from '../services/review.service';
import { CourseListing } from '../models/CourseListing';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Review } from '../models/Review';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  loading: boolean;
  masterList: CourseListing[];
  standardCourses: CourseListing[];
  currentSelectedCourseId: number;
  form;
  showMsg: boolean;
  msgText: string;
  msgType: string;
  dialogRef: MatDialogRef<any>;

  constructor(
    private courseService: CourseService,
    private reviewService: ReviewService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading = true;
    this.form = new FormGroup({
      comments: new FormControl('')
    });
    this.getCourses();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  /**
   * Filter the list by course name using user input text.
   * @param text Course name input by user
   */
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

  /**
   * Send user review to the database. Review model will have some empty fields here as we grab the user and date/time from server
   * Current setup allows non-logged in users to submit.
   * In an effort to provide some protection against multiple reviews by an anonymous User, local storage is set with an array of
   * course ids for courses reviewed.
   * Local storage only takes strings so we use JSON function to stringify and parse the array.
   * IF a user is logged in (which we don't require) THEN we store their member ID with the review
   */
  submitReview(form) {
    let reviewed = [];
    if (localStorage.getItem('reviewed') !== null) {
      reviewed = JSON.parse(localStorage.getItem('reviewed'));
    }
    if (reviewed.length === 0 || !reviewed.includes(this.currentSelectedCourseId.toString())) {

      this.subscriptions.push(this.reviewService.submit(this.currentSelectedCourseId, form.comments).subscribe(response => {
        if (response.status === 200) {
          this.msgText = 'Thank you for your review.';
          localStorage.setItem('reviewed', JSON.stringify(reviewed));
        } else {
          alert('Sorry there was a problem saving your review. Please try back later or contact us.');
          console.error(response);
        }
      }));
    } else {
      alert('Sorry you have already reviewed this course.');
    }
    // finally show message of result and close modal
    this.showMsg = true;
    this.dialogRef.close();
    this.form.get('comments').reset();
  }


  openReview(name, courseId, dialog) {
    this.currentSelectedCourseId = courseId;
    const reviewTitle = 'Review ' + name;
    this.dialogRef = this.dialog.open(dialog, { data: { reviewTitle }});
  }

  goToCourse(id) {
    this.router.navigate(['course/' + id]);
  }


  /**
   * Get all courses in db, filter to show approved.
   */
  getCourses() {
    this.subscriptions.push(this.courseService.getAll().subscribe(response => {
      if (response.status === 200) {
        const courses = response.payload;
        this.standardCourses = courses.filter(x => x.approval === 'approved');
        this.masterList = this.standardCourses;
      } else {
        console.error(response);
        alert('Sorry there was an error getting courses from the database. Try back later');
      }
      this.loading = false;
    }));
  }

}
