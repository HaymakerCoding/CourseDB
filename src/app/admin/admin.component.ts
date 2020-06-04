import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService} from '../services/course.service';
import { Subscription } from 'rxjs';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  numAwaitingApproval: number;
  numApproved: number;
  subscriptions: Subscription[] = [];

  constructor(private courseService: CourseService, private reviewService: ReviewService) { }

  ngOnInit() {
    this.numApproved = 0;
    this.numAwaitingApproval = 0;
    this.getNumAwaitingApproval();
    this.getNumApprved();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  /**
   * Return the number of courses with approval set to waiting. Admin needs to approve these for them to show on site.
   */
  getNumAwaitingApproval() {
    this.subscriptions.push(this.courseService.getAwaitingApproval().subscribe(response => {
      if (response.status === 200) {
        this.numAwaitingApproval = response.payload[0];
      } else {
        console.error(response);
      }
    }));
  }

  getNumApprved() {
    this.subscriptions.push(this.courseService.getNumApproved().subscribe(response => {
      if (response.status === 200) {
        this.numApproved = response.payload[0];
      } else {
        console.error(response);
      }
    }));
  }



}
