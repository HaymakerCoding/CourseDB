import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  dialogRef: MatDialogRef<any>;
  userLoggedIn: boolean;
  userName: string;
  userId: number;
  subscriptions: Subscription[] = [];
  onPhone: boolean;
  isUserAdmin: boolean;
  showUserMenu: boolean;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private breakpointOberver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.showUserMenu = false;
    this.userLoggedIn = false;
    this.initBreakObserver();
    this.checkLoggedIn();
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  /**
   * Listen to screen size changes, for setting phone specific settings like nav background image
   */
  initBreakObserver() {
    this.breakpointOberver.observe(
      ['(max-width: 800px)']).subscribe(result => {
        if (result.matches) {
          this.onPhone = true;
        } else {
          this.onPhone = false;
        }
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  showLogin() {
    this.dialogRef = this.dialog.open(LoginComponent, { disableClose: false});
    this.dialogRef.afterClosed().subscribe(response => {
      if (response && response === 200) {
        this.checkLoggedIn();
      }
    });
  }

  setUserName() {
    this.userName = this.authService.getUserName();
    this.isUserAdmin = this.authService.getIsUserAdmin();
  }
  setUserId() {
    this.userId = this.authService.getUserId();
  }

  logout() {
    this.authService.logout();
    this.userName = null;
    this.isUserAdmin = false;
    this.userLoggedIn = false;
  }

  getUserName() {
    return this.userName;
  }

  checkLoggedIn() {
    if (this.authService.getIsLoggedIn() === true && this.authService.getUserName()) {
      this.userLoggedIn = true;
      this.setUserName();
      this.setUserId();
    } else {
      this.subscriptions.push(this.authService.checkLoggedIn().subscribe(response => {
        if (response.status === 200) {
          this.userLoggedIn = true;
          this.setUserName();
          this.setUserId();
        } else {
          this.userLoggedIn = false;
        }
      }));
    }
  }

}
