import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Course } from '../models/Course';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  @Input() course: Course;
  @Input() userType: string;
  unsavedChanges: boolean;
  form: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(
    private courseService: CourseService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.unsavedChanges = false;
    this.initForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  submitForm(data) {
    this.subscriptions.push(this.courseService.updateDetails(data).subscribe(response => {
      if (response.status === 200) {
        // display msg about success
        this.snackbar.open('Changes saved successfully', '', { duration: 1200 });
      } else {
        console.error(response);
      }
    }));
  }

  /**
   * Check for changes between the obj in memory and the form fields, if different offer a warning msg to user.
   * Runs on input change
   */
  checkUnsaved() {
    if (
        this.form.get('left_blue_box_text').value !== this.course.leftBoxText ||
        this.form.get('left_blue_box_title').value !== this.course.leftBoxTitle ||
        this.form.get('left_blue_box_link').value !== this.course.leftBoxLink  ||
        this.form.get('right_blue_box_text').value !== this.course.rightBoxText ||
        this.form.get('right_blue_box_title').value !== this.course.rightBoxTitle  ||
        this.form.get('right_blue_box_link').value !== this.course.rightBoxLink  ||
        this.form.get('more_info_1_text').value !== this.course.moreInfoText1 ||
        this.form.get('more_info_2_text').value !== this.course.moreInfoText2 ||
        this.form.get('more_info_3_text').value !== this.course.moreInfoText3 ||
        this.form.get('more_info_4_text').value !== this.course.moreInfoText4 ||
        this.form.get('more_info_5_text').value !== this.course.moreInfoText5 ||
        this.form.get('more_info_6_text').value !== this.course.moreInfoText6 ||
        this.form.get('more_info_7_text').value !== this.course.moreInfoText7 ||
        this.form.get('more_info_8_text').value !== this.course.moreInfoText8 ||
        this.form.get('more_info_1_link').value !== this.course.moreInfoLink1 ||
        this.form.get('more_info_2_link').value !== this.course.moreInfoLink2 ||
        this.form.get('more_info_3_link').value !== this.course.moreInfoLink3 ||
        this.form.get('more_info_4_link').value !== this.course.moreInfoLink4 ||
        this.form.get('more_info_5_link').value !== this.course.moreInfoLink5 ||
        this.form.get('more_info_6_link').value !== this.course.moreInfoLink6 ||
        this.form.get('more_info_7_link').value !== this.course.moreInfoLink7 ||
        this.form.get('more_info_8_link').value !== this.course.moreInfoLink8
    ) {
      this.unsavedChanges = true;
    }
  }

  /**
   * Initialize the form fields with data from the database if set
   */
  initForm() {
    this.form = new FormGroup({
      id: new FormControl(this.course.id),
      left_blue_box_title: new FormControl(this.course.leftBoxTitle),
      left_blue_box_text: new FormControl(this.course.leftBoxText),
      left_blue_box_link: new FormControl(this.course.leftBoxLink),
      right_blue_box_title: new FormControl(this.course.rightBoxTitle),
      right_blue_box_text: new FormControl(this.course.rightBoxText),
      right_blue_box_link: new FormControl(this.course.rightBoxLink),
      more_info_1_text: new FormControl(this.course.moreInfoText1),
      more_info_1_link: new FormControl(this.course.moreInfoLink1),
      more_info_2_text: new FormControl(this.course.moreInfoText2),
      more_info_2_link: new FormControl(this.course.moreInfoLink2),
      more_info_3_text: new FormControl(this.course.moreInfoText3),
      more_info_3_link: new FormControl(this.course.moreInfoLink3),
      more_info_4_text: new FormControl(this.course.moreInfoText4),
      more_info_4_link: new FormControl(this.course.moreInfoLink4),
      more_info_5_text: new FormControl(this.course.moreInfoText5),
      more_info_5_link: new FormControl(this.course.moreInfoLink5),
      more_info_6_text: new FormControl(this.course.moreInfoText6),
      more_info_6_link: new FormControl(this.course.moreInfoLink6),
      more_info_7_text: new FormControl(this.course.moreInfoText7),
      more_info_7_link: new FormControl(this.course.moreInfoLink7),
      more_info_8_text: new FormControl(this.course.moreInfoText8),
      more_info_8_link: new FormControl(this.course.moreInfoLink8)
    });
  }

}
