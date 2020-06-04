
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Email } from '../models/Email';
import { Observable, empty } from 'rxjs';

/**
 * Send requests that need to send email via php mail function
 *
 * @author Malcolm Roy
 */


@Injectable({
  providedIn: 'root'
})
export class EmailService {
    response: Observable<any>;

    constructor(private http: HttpClient) {

    }

    /**
     * Send email data to server for course addition recommended
     * @param form Form data
     */
    send(form) {
      return this.http.post<any>('https://clubeg.golf/common/api_REST/v1/courseDB/send-add-course-email/index.php',
        { form }
      ).pipe(map(response => {
        return response;
      }));
    }

    /**
     * Send email data to server for user request to manage a course
     * @param form Form data
     */
    sendManagerReqest(form) {
      return this.http.post<any>('https://clubeg.golf/common/api_REST/v1/courseDB/send-add-manager-email/index.php',
        { form }
      ).pipe(map(response => {
        return response;
      }));
    }

}
