
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { CustomResponse } from '../models/CustomResponse';
import { Review } from '../models/Review';

/**
 * Send all Http requests to the server for course Review data
 *
 * @author Malcolm Roy
 */


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

    constructor(private http: HttpClient) {

    }

    getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders().set('Authorization', 'Bearer ' + token);
    }

    /**
     * Save a User's review of a golfcourse, public
     */
    submit(courseId, comments) {
      const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/submit-course-review/index.php';
      return this.http.post<CustomResponse>(URL, { courseId, comments })
        .pipe(map(response => {
          return response;
        }));
    }

    /**
     * Get all reviews made
     */
    getAll() {
      const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/get-all-course-reviews/index.php';
      return this.http.get<any>(URL)
      .pipe(map(response => {
        return response;
      }));
    }

    /**
     * Delete a course review that a user made. Protected route for admins only.
     * @param id ID of the review record.
     */
    delete(id: string) {
      const params = new HttpParams().set('id', id);
      const headers = this.getHeaders();
      const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/delete-course-review/index.php';
      return this.http.delete<CustomResponse>(URL, { params, headers })
      .pipe(map(response => {
        return response;
      }));
    }




}
