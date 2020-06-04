import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { BasicCourse } from '../models/BasicCourse';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-basic-course',
  templateUrl: './add-basic-course.component.html',
  styleUrls: ['./add-basic-course.component.scss']
})
/**
 * Add a basic course listing to the database, Admin only
 */
export class AddBasicCourseComponent implements OnInit, OnDestroy {

  form;
  subscriptions: Subscription[] = [];

  constructor(
    private courseService: CourseService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      website: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      region: new FormControl(''),
      submitted_by: new FormControl('', Validators.required),
      submitter_email: new FormControl('', Validators.compose([Validators.required, Validators.email]))
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Send the new Basic course data to the service for adding to the database
   * @param form Form data from user(admin), new basic course entry info
   */
  submitForm(form) {
    const newCourse = new BasicCourse(form.id, form.name, form.website, form.city, form.province,
      form.country, form.region, form.submitted_by, form.submitter_email, null);
    this.subscriptions.push(this.courseService.addBasicCourse(newCourse).subscribe(result => {
      if (result.status === 201) {
        this.snackbar.open('Course added successfully!', '', { duration: 1200 });
        this.clearForm();
      } else {
        alert('Sorry there was an error adding the course.');
        console.error(result);
      }
    }, (error) => {
      console.error(error);
    }));
  }

  clearForm() {
    this.form.get('name').reset();
    this.form.get('website').reset();
    this.form.get('city').reset();
    this.form.get('province').reset();
    this.form.get('country').reset();
    this.form.get('region').reset();
    this.form.get('submitted_by').reset();
    this.form.get('submitter_email').reset();
  }

}
