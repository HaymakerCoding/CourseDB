
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Course } from '../models/Course';
import { CourseListing } from '../models/CourseListing';
import { BasicCourse } from '../models/BasicCourse';
import { Promo } from '../models/Promo';
import { CustomResponse } from '../models/CustomResponse';

/**
 * Send all Http requests to the server for course related data.
 *
 * @author Malcolm Roy
 */


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courses = [];

  constructor(
    private http: HttpClient) {
  }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  /**
   * Get all courses for a user to choose from to book at
   */
  getAll() {
    return this.http.get<any>('https://clubeg.golf/common/api_REST/v1/courseDB/courses/get-all/index.php')
      .pipe(map(response => {
        return response;
      }));
  }

  /**
   * Get all the basic courses in the database
   */
  getAllBasicCourses() {
    return this.http.get<CustomResponse>('https://clubeg.golf/common/api_REST/v1/courseDB/courses/get-all-basic-courses/index.php')
      .pipe(map(response => {
        return response;
      }));
  }

  /**
   * Get all info for a golf course with the seleted ID
   * @param id Database record ID for the course
   */
  get(id) {
    // set HTTP params
    const params = new HttpParams().set('id', id);
    const URL = 'https://clubeg.golf/common/api_REST/v1/clubeg/courses/get/index.php';
    return this.http.get<CustomResponse>(URL, { params })
      .pipe(map(response => {
          return response;
      })
    );
  }

  /**
   * Get a basic list of all courses the user is a manager for
   */
  getUserCourses() {
    const headers = this.getHeaders();
    return this.http.get<CustomResponse>('https://clubeg.golf/common/api_REST/v1/courseDB/courses/get-user-courses/index.php',
    { headers })
      .pipe(map(response => {
        return response;
      }));
  }

  /**
   * Get a course record. Returned as a BasicCourse obj within Response
   * @param id PK of the course record
   */
  getBasicCourse(id: number) {
    const params = new HttpParams().set('id', id.toString());
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/get-basic-course/index.php';
    return this.http.get<any>(URL, { params })
      .pipe(map(response => {
        return response;
    }));
  }

  /**
   * Update a basic course listing with any changes
   * @param course New Basic Course obj data
   */
  updateBasicCourse(course: BasicCourse) {
    const headers = this.getHeaders();
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/update-basic-course/index.php';
    return this.http.patch<CustomResponse>(URL, { course },  { headers })
      .pipe(map(response => {
        return response;
    }));
  }

  /**
   * A user has added a course, This is a basic info listing and needs to be validated by admin before showing
   */
  addBasicCourse(course: BasicCourse) {
    const headers = this.getHeaders();
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/add-basic-course/index.php';
    return this.http.post<any>(URL, { course },  { headers })
    .pipe(map(response => {
      return response;
    }));
  }

  deleteBasicCourse(id: number) {
    const headers = this.getHeaders();
    const params = new HttpParams().set('id', id.toString());
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/delete-basic-course/index.php';
    return this.http.delete<any>(URL, { params, headers })
      .pipe(map(response => {
        return response;
    }));
  }

  /**
   * Update a courses 'owner' to the member supplied.
   * @param courseId Course ID
   * @param memberId Member ID
   */
  updateManager(courseId: any, memberId: number) {
    const headers = this.getHeaders();
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/update-manager/index.php';
    return this.http.patch<any>(URL, { courseId, memberId }, { headers })
      .pipe(map(response => {
        return response;
    }));
  }

  getAllManagers() {
    const headers = this.getHeaders();
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/get-all-managers/index.php';
    return this.http.get<any>(URL, { headers })
      .pipe(map(response => {
        return response;
      }));
  }

  /**
   * Update a STANDARD course listing with any changes to the DETAILS section
   * @param course data from form fields
   */
  updateDetails(course: any) {
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/update-standard-course-details/index.php';
    const headers = this.getHeaders();
    return this.http.patch<CustomResponse>(URL, { course }, { headers })
      .pipe(map(response => {
        return response;
    }));
  }

  /**
   * Update a STANDARD course listing with any changes to the basic info section
   * Two different end points depending on user(manager) vs admin. Both are locked down on the server to those roles only.
   * @param basicInfo Form data for basic info fields
   */
  updateBasicInfo(course: any) {
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/update-standard-course-basicInfo/index.php';
    const headers = this.getHeaders();
    return this.http.patch<CustomResponse>(URL, { course }, { headers })
      .pipe(map(response => {
        return response;
    }));
  }

  /**
   * A user has added a course, This is a standard listing starting with basic info and needs to be validated by admin before showing
   */
  addStandardCourse(course: Course) {
    const headers = this.getHeaders();
    return this.http.post<CustomResponse>('https://clubeg.golf/common/api_REST/v1/courseDB/courses/add-standard-course/index.php',
    {  course }, { headers })
    .pipe(map(response => {
      return response;
    }));
  }

  deleteStandardCourse(id: string) {
    const headers = this.getHeaders();
    const params = new HttpParams().set('id', id);
    return this.http.delete<CustomResponse>('https://clubeg.golf/common/api_REST/v1/courseDB/courses/delete-standard-course/index.php',
    { params, headers })
    .pipe(map(response => {
      return response;
    }));
  }

  /**
   * Return the number of courses that have the approval set as 'waiting'
   */
  getAwaitingApproval() {
    return this.http.get<CustomResponse>('https://clubeg.golf/common/api_REST/v1/courseDB/courses/get-awaiting-approval/index.php')
      .pipe(map(response => {
        return response;
      }));
  }

  /**
   * Return the number of courses that have the approval set as 'approved'
   */
  getNumApproved() {
    return this.http.get<CustomResponse>('https://clubeg.golf/common/api_REST/v1/courseDB/courses/get-num-approved/index.php')
      .pipe(map(response => {
        return response;
      }));
  }

  /**
   * Update 1 attribute for a golf course record
   * @param courseId Course ID, PK
   * @param attribute Column name
   * @param value New value for that column
   */
  updateOne(courseId, attribute, value) {
    const headers = this.getHeaders();
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/update-one/index.php';
    return this.http.patch<CustomResponse>(URL, { courseId, attribute, value }, { headers })
      .pipe(map(response => {
        return response;
    }));
  }

  /**
   * Update a STANDARD course listing with any changes to the ICON links section
   * @param course Course data for icon links
   */
  updateIcons(course: any) {
    const headers = this.getHeaders();
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/update-standard-course-icons/index.php';
    return this.http.patch<CustomResponse>(URL, { course }, { headers })
      .pipe(map(response => {
        return response;
    }));
  }

  /**
   * Add a new promo for a golf course. Contains an image and an options link URL
   * For admin users only
   * @param courseId Course ID
   * @param link URL link for promo
   * @param image Image file
   */
  addPromo(courseId: number, link: string , image) {
    const headers = this.getHeaders();
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/promos/add/index.php';
    return this.http.post<any>(URL, { courseId, link, image}, { headers })
      .pipe(map(response => {
        return response;
    }));
  }

  /**
   * Remove a promo for a course
   * @param courseId Course ID
   * @param picURL Image URL in amazon s3
   */
  deletePromo(courseId: string, picURL: string) {
    const params = new HttpParams().set('courseId', courseId).set('picURL', picURL);
    const headers = this.getHeaders();
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/promos/delete/index.php';
    return this.http.delete<any>(URL, { params, headers })
      .pipe(map(response => {
        return response;
    }));
  }

  /**
   * Update just the URL link for a golfcourse promo ad
   * @param promoId promo record ID
   * @param link New URL
   */
  updatePromoLink(id, link) {
    const headers = this.getHeaders();
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/promos/update-link/index.php';
    return this.http.patch<CustomResponse>(URL, { id, link }, { headers })
      .pipe(map(response => {
        return response;
    }));
  }

  /**
   * Update just the image for a golfcourse promo ad
   * @param id promo record ID
   * @param image Image file
   */
  updatePromoImage(promoId, courseId, image, oldPicURL) {
    const headers = this.getHeaders();
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/promos/update-image/index.php';
    return this.http.patch<any>(URL, { promoId, courseId, image }, { headers })
      .pipe(map(response => {
        return response;
    }));
  }

  updateLogo(courseId, image, oldImgURL) {
    const headers = this.getHeaders();
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/update-logo/index.php';
    return this.http.patch<any>(URL, { image, courseId, oldImgURL}, { headers })
      .pipe(map(response => {
        return response;
    }));
  }

  addLogo(courseId, image) {
    const headers = this.getHeaders();
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/add-logo/index.php';
    return this.http.post<any>(URL, { image, courseId }, { headers })
      .pipe(map(response => {
        return response;
    }));
  }

  updateFeatureImage(courseId, image, oldImgURL) {
    const headers = this.getHeaders();
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/update-feature-image/index.php';
    return this.http.patch<any>(URL, { image, courseId, oldImgURL}, { headers })
      .pipe(map(response => {
        return response;
    }));
  }

  addFeatureImage(courseId, image) {
    const headers = this.getHeaders();
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/add-feature-image/index.php';
    return this.http.post<any>(URL, { image, courseId }, { headers })
      .pipe(map(response => {
        return response;
    }));
  }

  addSliderImage(courseId, image, column)  {
    const headers = this.getHeaders();
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/add-slider-image/index.php';
    return this.http.post<any>(URL, { image, courseId, column }, { headers })
      .pipe(map(response => {
        return response;
    }));
  }

  updateSliderImage(courseId, image, column, oldImgURL)  {
    const headers = this.getHeaders();
    const URL = 'https://clubeg.golf/common/api_REST/v1/courseDB/courses/update-slider-image/index.php';
    return this.http.patch<any>(URL, { image, courseId, column, oldImgURL }, { headers })
      .pipe(map(response => {
        return response;
    }));
  }

}
