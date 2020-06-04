import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseOwner } from '../models/CourseOwner';
import { CourseService } from '../services/course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.scss']
})
export class ManagersComponent implements OnInit, OnDestroy {

  allManagers: CourseOwner[];
  numManagers;
  subscriptions: Subscription[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.getAllManagers();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Get all managers that are attached to courses
   */
  getAllManagers() {
    this.subscriptions.push(this.courseService.getAllManagers().subscribe(response => {
      if (response.status === 200) {
        this.allManagers = response.payload;
        this.numManagers = this.allManagers.length;
      } else {
        console.error(response);
        alert('Sorry there was an error getting managers from the database');
      }
    }));
  }

  /**
   * Remove the manager from a course.
   * @param courseId The ID of course we want to switch back to admin ownership
   */
  removeManager(courseId) {
    this.subscriptions.push(this.courseService.updateManager(courseId, 1).subscribe(response => {
      if (response.status === 200) {
        // all good with update so remove the obj from memory
        this.allManagers = this.allManagers.filter(x => x.courseId !== courseId);
      } else {
        alert('Sorry there was an error trying to remove the manager');
        console.error(response);
      }
    }));
  }

}
