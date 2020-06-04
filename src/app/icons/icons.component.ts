import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Course } from '../models/Course';
import { CourseService } from '../services/course.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit, OnDestroy {

  @Input() course: Course;
  @Input() userType: string;
  form: FormGroup;
  subscriptions: Subscription[] = [];
  unsavedChanges: boolean;


  constructor(
    private courseService: CourseService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.unsavedChanges = false;
    this.setupForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  setupForm() {
    this.form = new FormGroup({
      id: new FormControl(this.course.id, Validators.required),
      website: new FormControl(this.course.website),
      phone: new FormControl(this.course.phone),
      email: new FormControl(this.course.email, Validators.email),
      map: new FormControl(this.course.map),
      facebook: new FormControl(this.course.facebook),
      twitter: new FormControl(this.course.twitter),
      instagram: new FormControl(this.course.instagram),
      youtube: new FormControl(this.course.youtube)
    });
  }

  /**
   * Check for changes between the obj in memory and the form fields, if different offer a warning msg to user.
   * Runs on input change
   */
  checkUnsaved() {
    if (
        this.form.get('website').value !== this.course.website ||
        this.form.get('phone').value !== this.course.phone ||
        this.form.get('email').value !== this.course.email ||
        this.form.get('map').value !== this.course.map ||
        this.form.get('facebook').value !== this.course.facebook ||
        this.form.get('twitter').value !== this.course.twitter ||
        this.form.get('instagram').value !== this.course.instagram ||
        this.form.get('youtube').value !== this.course.youtube
    ) {
      this.unsavedChanges = true;
    }
  }

  /**
   * Send all data from the form to update the icon links of a course listing
   * @param data Form data
   */
  submitForm(data) {
    this.subscriptions.push(this.courseService.updateIcons(data).subscribe(response => {
      if (response.status === 200) {
        // all good, update the in memory obj as well
        this.course.website = data.website;
        this.course.phone =  data.phone;
        this.course.email =  data.email;
        this.course.map = data.map;
        this.course.facebook = data.facebook;
        this.course.twitter = data.twitter;
        this.course.instagram = data.instagram;
        this.course.youtube = data.youtube;
        this.snackbar.open('Changes saved successfully', '', { duration: 1200 });
        this.unsavedChanges = false;
      } else {
        console.error(response);
      }
    }));
  }

}
