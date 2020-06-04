
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Member } from '../models/Member';
import { CustomResponse } from '../models/CustomResponse';

/**
 * Send all Http requests to the server for Member related data.
 *
 * @author Malcolm Roy
 */


@Injectable({
  providedIn: 'root'
})
export class MemberService {

    constructor(private http: HttpClient) {

    }

    getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      return new HttpHeaders().set('Authorization', 'Bearer ' + token);
    }

    getAll() {
      const headers = this.getHeaders();
      return this.http.get<any>('https://clubeg.golf/common/api_REST/v1/clubeg/members/get-all/index.php', { headers })
        .pipe(map(response => {
          return response;
      }));
    }

    /**
     * Return ALL data for a specific Member
     * @param id Member id in DB 'tbl_member' table
     */
    get(id) {
      // set HTTP params
      const params = new HttpParams().set('id', id);
      const URL = '';
      return this.http.get<CustomResponse>(URL, { params })
        .pipe(map(response => {
            return response;
        })
      );
    }


}
