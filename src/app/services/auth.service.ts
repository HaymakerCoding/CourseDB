import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn: boolean;
  private userName: string;
  private userId: number;
  private isUserAdmin: boolean;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }

  getIsLoggedIn() {
    return this.isLoggedIn;
  }

  getUserName() {
    return this.userName;
  }

  getUserId() {
    return this.userId;
  }

  getIsUserAdmin() {
    return this.isUserAdmin;
  }

  checkLoggedIn() {
    const headers = this.getHeaders();
    return this.http.get<any>('https://clubeg.golf/common/api_REST/v1/auth/check_logged_in.php',
    { headers })
    .pipe(map(response => {
      if (response.status === 200) {
        this.userId = +response.payload[2];
        this.isLoggedIn = true;
        this.userName = response.payload[0];
        this.isUserAdmin = response.payload[1];
      } else {
        this.isLoggedIn = false;
      }
      return response;
    }));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  login(form) {
    return this.http.post<any>('https://clubeg.golf/common/api_REST/v1/auth/login.php', {
      password: form.password,
      email: form.email
    }).pipe(map(response => {
      return response;
    }));
  }

  /**
   * Check that a user is logged in AND and admin user
   * @param next The next route if this user is allowed access. Otherwise we send them to login screen
   */
  isAdmin(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const headers = this.getHeaders();
    return this.http.get<any>('https://clubeg.golf/common/api_REST/v1/auth/check_logged_in.php',
    { headers })
    .pipe(map(response => {
      if (response.status === 200 && response.payload[1] === true) {
        return true;
      } else {
        return false;
      }
    }));
  }

  checkUserLoggedIn(next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const headers = this.getHeaders();
    return this.http.get<any>('https://clubeg.golf/common/api_REST/v1/auth/check_logged_in.php',
    { headers })
    .pipe(map(response => {
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    }));
  }
}
