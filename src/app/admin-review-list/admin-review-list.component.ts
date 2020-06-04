import { Component, OnInit, OnDestroy } from '@angular/core';
import { Review } from '../models/Review';
import { ReviewService } from '../services/review.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-review-list',
  templateUrl: './admin-review-list.component.html',
  styleUrls: ['./admin-review-list.component.scss']
})
export class AdminReviewListComponent implements OnInit, OnDestroy {

  constructor(private reviewService: ReviewService) { }

  reviews: Review[];
  masterReviewList: Review[];
  loading: boolean;
  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.loading = true;
    this.getAllReviews();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  /**
   * Delete a golf course review made by a user
   * @param id ID of the review record to delete
   */
  deleteReview(id) {
    this.subscriptions.push(this.reviewService.delete(id).subscribe(response => {
      if (response.status === 200) {
        // successul operation but no return content, lets remove the record from memory
        this.reviews = this.reviews.filter(x => x.id !== id);
      } else {
        // failed
        alert('Delete failed');
        console.error(response);
      }
    }));
  }

  /**
   * Filter the list by course name using user input text.
   * @param text Course name input by user
   */
  refineList(text: string) {
    this.reviews = [];
    if (text === '') {
      this.reviews = this.masterReviewList;
    } else {
      this.reviews = this.masterReviewList.filter((review) => {
        if (review.courseName.toLowerCase().startsWith(text.toLowerCase())) {
          return review;
        }
      });
    }
  }

  getAllReviews() {
    this.subscriptions.push(this.reviewService.getAll().subscribe(response => {
      if (response.status === 200) {
        this.reviews = response.payload;
        this.masterReviewList = response.payload;
      } else {
        console.error(response);
      }
      this.loading = false;
    }));
  }


}
