import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailService } from '../services/email.service';
import { Email } from '../models/Email';
import { CourseService } from '../services/course.service';
import { Course } from '../models/Course';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit, OnDestroy {

  form;
  susbscriptions: Subscription[] = [];
  showThankYou: boolean;
  alertType: string;
  alertMsg: string;

  constructor(private emailService: EmailService, private couresService: CourseService) { }

  ngOnInit() {
    this.form = new FormGroup({
      Course_Name: new FormControl('', Validators.required),
      Website: new FormControl('', Validators.required),
      City: new FormControl('', Validators.required),
      Province: new FormControl('', Validators.required),
      Country: new FormControl('', Validators.required),
      Name: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      Comment: new FormControl('')
    });
  }

  ngOnDestroy() {
    this.susbscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Send all data from the form to admin via email as well as setup a new course entry BUT with flag for verification
   * @param data All form fields from the HTML form
   */
  submitForm(data) {
    this.susbscriptions.push(this.emailService.send(data).subscribe(response => {
      if (response.status === 200) {
        // success
        this.alertType = 'success';
        this.alertMsg = 'Thank you for adding a course. We will verify the information and publish it. Check back soon.';
        this.showThankYou = true;
      } else {
        // email failure
        this.alertType = 'danger';
        this.alertMsg = 'Sorry there has been an error with your request. Please contact us.';
        this.showThankYou = true;
        console.error(response);
      }
    }));

  }

}
