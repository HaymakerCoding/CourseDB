import { Component, OnInit, OnDestroy } from '@angular/core';
import { getDefaultService } from 'selenium-webdriver/chrome';
import { CourseListing } from '../models/CourseListing';
import { Subscription } from 'rxjs';
import { CourseService } from '../services/course.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-courses-list',
  templateUrl: './user-courses-list.component.html',
  styleUrls: ['./user-courses-list.component.scss']
})
export class UserCoursesListComponent implements OnInit, OnDestroy {

  userCourses: CourseListing[];
  subscriptions: Subscription[] = [];
  loading: boolean;
  userName: string;

  constructor(
    private courseService: CourseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.setUserName();
    this.getUserCourses();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  setUserName() {
    this.userName = this.authService.getUserName();
  }

  /**
   * Get all courses that the logged in user is a manger/owner of. Just basic info for list
   */
  getUserCourses() {
    this.subscriptions.push(this.courseService.getUserCourses().subscribe(response => {
      if (response.status === 200) {
        this.userCourses = response.payload;
        console.log(this.userCourses);
      } else {
        alert('Sorry there was an error getting courses from the database. Try back later of contact ClubEG.');
        console.error(response);
      }
      this.loading = false;
    }));
  }

}
