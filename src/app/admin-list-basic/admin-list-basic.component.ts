import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasicCourse } from '../models/BasicCourse';
import { CourseService } from '../services/course.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-list-basic',
  templateUrl: './admin-list-basic.component.html',
  styleUrls: ['./admin-list-basic.component.scss']
})
export class AdminListBasicComponent implements OnInit, OnDestroy {

  basicCourses: BasicCourse[];
  showText: string;
  subscriptions: Subscription[] = [];
  loading: boolean;

  constructor(
    private courseService: CourseService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading = true;
    this.getAllBasicCourses();
    this.showText = 'more';
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Get the list of all Basic Courses in db
   */
  getAllBasicCourses() {
    this.subscriptions.push(this.courseService.getAllBasicCourses().subscribe(response => {
      if (response.status === 200) {
        this.basicCourses = response.payload;
      } else {
        alert('Sorry there was an error getting basic course from the database');
        console.error(response);
      }
      this.loading = false;
    }));
  }

  /**
   * Toggle more or less info in the table
   */
  changeInfo() {
    if (this.showText === 'less') {
      this.showText = 'more';
    } else {
      this.showText = 'less';
    }
  }

  /**
   * Delete a course
   * @param id PK of the course record
   */
  delete(id) {
    const thisCourse = this.basicCourses.find(course => course.id === id);
    if (confirm('Are you sure you want to delete: \'' + thisCourse.fullName + '\'?')) {
      this.subscriptions.push(this.courseService.deleteBasicCourse(id).subscribe(response => {
        if (response.status === 200) {
          // filter out the removed record from memory
          this.snackbar.open('Courses delete successfully!', '' , { duration: 1200 });
          this.basicCourses = this.basicCourses.filter(x => x.id !== id);
        } else {
          console.error(response);
        }
      }));
    }
  }

  goToEdit(id) {
    this.router.navigate(['/admin/basic/edit', id]);
  }

}
