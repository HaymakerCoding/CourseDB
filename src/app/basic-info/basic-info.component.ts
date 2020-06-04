import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../models/Course';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

  form;
  unsavedChanges: boolean;

  @Input() course: Course;
  @Input() userType: string;

  constructor(
    private courseService: CourseService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.unsavedChanges = false;
    this.setupForm();
  }

  setupForm() {
    this.form = new FormGroup({
      id: new FormControl(this.course.id, Validators.required),
      full_name: new FormControl(this.course.fullName, Validators.required),
      address: new FormControl(this.course.address),
      city: new FormControl(this.course.city, Validators.required),
      about: new FormControl(this.course.about),
      region: new FormControl(this.course.region),
      province: new FormControl(this.course.province, Validators.required),
      country: new FormControl(this.course.country, Validators.required)

    });
  }

  /**
   * Check for changes between the obj in memory and the form fields, if different offer a warning msg to user.
   * Runs on input change
   */
  checkUnsaved() {
    if ((this.form.get('full_name').value !== this.course.fullName ||
          this.form.get('address').value !== this.course.address ||
          this.form.get('city').value !== this.course.city ||
          this.form.get('about').value !== this.course.about ||
          this.form.get('region').value !== this.course.region ||
          this.form.get('province').value !== this.course.province ||
          this.form.get('country').value !== this.course.country)
    ) {
      this.unsavedChanges = true;
    }
  }

  /**
   * Send all data from the form to update the basic info of a course listing
   * @param data Form data
   */
  submitForm(data) {
    this.courseService.updateBasicInfo(data).subscribe(response => {
      if (response.status === 200) {
        // all good, update the in memory obj as well
        this.course.fullName = data.full_name;
        this.course.address =  data.address;
        this.course.city =  data.city;
        this.course.province = data.province;
        this.course.country = data.country;
        this.course.region = data.region;
        this.course.about = data.about;
        this.unsavedChanges = false;
        this.snackbar.open('Changes saved successfully', '', { duration: 1200 });
      }  else {
        console.error(response);
      }
    });

  }

}
