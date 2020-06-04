import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BasicCourse } from '../models/BasicCourse';
import { CourseService } from '../services/course.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-edit-basic',
  templateUrl: './admin-edit-basic.component.html',
  styleUrls: ['./admin-edit-basic.component.scss']
})
export class AdminEditBasicComponent implements OnInit, OnDestroy {

  courseId: number;
  course: BasicCourse;
  form;
  subscriptions: Subscription[] = [];
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loading = true;
    this.setId();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  setupForm() {
    this.form = new FormGroup({
      id: new FormControl(this.course.id, Validators.required),
      name: new FormControl(this.course.fullName, Validators.required),
      website: new FormControl(this.course.website, Validators.required),
      city: new FormControl(this.course.city, Validators.required),
      province: new FormControl(this.course.province, Validators.required),
      country: new FormControl(this.course.country, Validators.required),
      region: new FormControl(this.course.region),
      submitted_by: new FormControl(this.course.submittedBy, Validators.required),
      submitter_email: new FormControl(this.course.submitterEmail, Validators.compose([Validators.required, Validators.email]))
    });
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
      error => { console.log(error); },
      () => {
      }
    );
  }

  /**
   * Get the course that we are editing
   */
  getCourse() {
    this.subscriptions.push(this.courseService.getBasicCourse(this.courseId).subscribe(response => {
      if (response.status === 200) {
        this.course = response.payload;
        this.setupForm();
      } else {
        alert('Sorry there was a problem getting courses from the database.');
        console.error(response);
      }
      this.loading = false;
    }));
  }

  /**
   * Submit the form data to the service to update the basic course info
   * @param data Form data
   */
  submitForm(data) {
    const updatedCourse = new BasicCourse(data.id, data.name, data.website,
         data.city, data.province, data.country, data.region, data.submitted_by, data.submitter_email, null);
    this.subscriptions.push(this.courseService.updateBasicCourse(updatedCourse).subscribe(response => {
      if (response.status === 200) {
        this.snackbar.open('Changes saved!', '', { duration: 1200 });
        this.course = updatedCourse;
      } else {
        alert('Error course changes not saved.');
        console.error(response);
      }
    }));
  }

}
