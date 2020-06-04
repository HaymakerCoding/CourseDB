import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { BasicCourse } from '../models/BasicCourse';
import { Member } from '../models/Member';
import { MemberService } from '../services/member.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-add-standard',
  templateUrl: './admin-add-standard.component.html',
  styleUrls: ['./admin-add-standard.component.scss']
})
export class AdminAddStandardComponent implements OnInit {

  form;
  allMembers: Member[];

  constructor(
    private courseService: CourseService,
    private snackbar: MatSnackBar,
    private memberService: MemberService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      region: new FormControl(''),
      manager: new FormControl('1', Validators.required),
    });
  }

  submitForm(data) {
    this.courseService.addStandardCourse(data).subscribe(response => {
      if (response.status === 201) {
        this.snackbar.open('Courses added successfully!', '', { duration: 1200 });
        this.clearForm();
      } else {
        console.error(response);
      }
    }, (error) => {
      console.error(error);
    });
  }

  /**
   * Clear all form fields so ready to add a new record
   */
  clearForm() {
    this.form.get('name').reset();
    this.form.get('city').reset();
    this.form.get('province').reset();
    this.form.get('country').reset();
    this.form.get('region').reset();
  }

}
