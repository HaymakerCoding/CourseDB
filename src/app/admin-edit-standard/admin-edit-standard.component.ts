import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../models/Course';
import { Subscription } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';


@Component({
  selector: 'app-admin-edit-standard',
  templateUrl: './admin-edit-standard.component.html',
  styleUrls: ['./admin-edit-standard.component.scss']
})
export class AdminEditStandardComponent implements OnInit, OnDestroy {

  courseId: number;
  course: Course;
  showPage: boolean;
  showSection: number;
  subscriptions: Subscription[] = [];
  dialogRef: MatDialogRef<any>;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.showSection = 1;
    this.setId();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  /**
   * Get course ID from router param and set to local variable
   */
  setId() {
    this.subscriptions.push(this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.courseId = +params.get('id');
        this.getCourse();
      }));
  }

  /**
   * Get the course data for the Course we are editing
   */
  getCourse() {
    this.subscriptions.push(this.courseService.get(this.courseId).subscribe(response => {
      if (response.status === 200) {
        this.course = response.payload[0];
        this.showPage = true;
      } else {
        console.error(response.status);
      }
    }));
  }

  changeSection(section: number) {
    this.showSection = section;
  }

  /**
   * Open a dialog to preview the course, opens a child component in a material dialog
   * @param dialog Template ref to open
   * @param id course ID
   */
  openPreview(dialog, id) {
    this.dialogRef = this.dialog.open(dialog, { data: id });
  }

  close() {
    this.dialogRef.close();
  }


}
