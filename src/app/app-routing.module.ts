import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseComponent } from './course/course.component';
import { CreateComponent } from './create/create.component';
import { ReviewComponent } from './review/review.component';
import { UserCoursesListComponent } from './user-courses-list/user-courses-list.component';
import { UserEditCourseComponent } from './user-edit-course/user-edit-course.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './services/admin-guard.service';
import { AddBasicCourseComponent } from './add-basic-course/add-basic-course.component';
import { AdminListBasicComponent } from './admin-list-basic/admin-list-basic.component';
import { AdminEditBasicComponent } from './admin-edit-basic/admin-edit-basic.component';
import { ManagersComponent } from './managers/managers.component';
import { AdminAddManagerComponent } from './admin-add-manager/admin-add-manager.component';
import { AdminReviewListComponent } from './admin-review-list/admin-review-list.component';
import { AdminListStandardComponent } from './admin-list-standard/admin-list-standard.component';
import { AdminUnapprovedListComponent } from './admin-unapproved-list/admin-unapproved-list.component';
import { AdminApprovedListComponent } from './admin-approved-list/admin-approved-list.component';
import { AdminAddStandardComponent } from './admin-add-standard/admin-add-standard.component';
import { AdminEditStandardComponent } from './admin-edit-standard/admin-edit-standard.component';
import { UpgradeComponent } from './upgrade/upgrade.component';


const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent  },
  { path: 'add', component: AddCourseComponent },
  { path: 'course/:id', component: CourseComponent },
  { path: 'create', component: CreateComponent },
  { path: 'reviews', component: ReviewComponent },
  { path: 'user/course/all', component: UserCoursesListComponent, canActivate: [AuthGuard] },
  { path: 'user/course/:id', component: UserEditCourseComponent, canActivate: [AuthGuard] },

  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },

  { path: 'admin/basic/add', component: AddBasicCourseComponent, canActivate: [AdminGuard] },
  { path: 'admin/basic/all', component: AdminListBasicComponent, canActivate: [AdminGuard] },
  { path: 'admin/basic/edit/:id', component: AdminEditBasicComponent, canActivate: [AdminGuard] },
  { path: 'admin/basic/upgrade', component: UpgradeComponent, canActivate: [AdminGuard]},

  { path: 'admin/standard/all', component: AdminListStandardComponent, canActivate: [AdminGuard] },
  { path: 'admin/standard/awaiting', component: AdminUnapprovedListComponent, canActivate: [AdminGuard] },
  { path: 'admin/standard/approved', component: AdminApprovedListComponent, canActivate: [AdminGuard] },
  { path: 'admin/standard/add', component: AdminAddStandardComponent, canActivate: [AdminGuard] },
  { path: 'admin/standard/edit/:id', component: AdminEditStandardComponent, canActivate: [AdminGuard] },

  { path: 'admin/managers/all', component: ManagersComponent, canActivate: [AdminGuard] },
  { path: 'admin/managers/add', component: AdminAddManagerComponent, canActivate: [AdminGuard] },

  { path: 'admin/reviews/all', component: AdminReviewListComponent, canActivate: [AdminGuard]},

  { path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
