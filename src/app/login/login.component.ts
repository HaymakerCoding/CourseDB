import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  hide: boolean;
  emailError: string;
  passError: string;
  accessError: string;
  subscriptions: Subscription[] = [];
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    public authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.loading = true;
    this.emailError = '';
    this.passError = '';
    this.hide = true;
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.loading = false;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Submit login data to the server for user verification
   * @param data Form data
   */
  login(data) {
    this.subscriptions.push(this.authService.login(data).subscribe(response => {
      if (response.status === '200') {
        localStorage.setItem('token', response.payload[0].token);
        this.authService.isLoggedIn = true;
        this.dialogRef.close(200);
      } else {
        const msg = response.payload[0];
        this.emailError = '';
        this.passError = '';
        this.loginForm.get('email').setValue('');
        this.loginForm.get('password').setValue('');
        if (msg.includes('User not found in database')) {
          this.emailError = 'User not found';
        } else if (msg.includes('Incorrect password')) {
          this.passError = 'Incorrect password';
        }
        console.error(response);
      }
    }));
  }

  goToSignUp() {
    const location = window.location.href;
    localStorage.setItem('returnLocation', location);
    window.location.href = 'https://www.clubeg.golf/clubeg-app/#/sign-up';
  }


}
