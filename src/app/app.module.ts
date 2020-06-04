import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, MatSliderModule, MatToolbarModule,
MatCardModule, MatSlideToggleModule, MatListModule, MatTableModule, MatExpansionModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CourseComponent } from './course/course.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CreateComponent } from './create/create.component';
import { ReviewComponent } from './review/review.component';
import { UserCoursesListComponent } from './user-courses-list/user-courses-list.component';
import { UserEditCourseComponent } from './user-edit-course/user-edit-course.component';
import { AdminComponent } from './admin/admin.component';
import { AddBasicCourseComponent } from './add-basic-course/add-basic-course.component';
import { AdminListBasicComponent } from './admin-list-basic/admin-list-basic.component';
import { AdminEditBasicComponent } from './admin-edit-basic/admin-edit-basic.component';
import { ManagersComponent } from './managers/managers.component';
import { AdminAddManagerComponent } from './admin-add-manager/admin-add-manager.component';
import { AdminReviewListComponent } from './admin-review-list/admin-review-list.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { IconsComponent } from './icons/icons.component';
import { PicturesComponent } from './pictures/pictures.component';
import { PromosComponent } from './promos/promos.component';
import { DetailsComponent } from './details/details.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { AdminListStandardComponent } from './admin-list-standard/admin-list-standard.component';
import { AdminUnapprovedListComponent } from './admin-unapproved-list/admin-unapproved-list.component';
import { AdminApprovedListComponent } from './admin-approved-list/admin-approved-list.component';
import { AdminAddStandardComponent } from './admin-add-standard/admin-add-standard.component';
import { AdminEditStandardComponent } from './admin-edit-standard/admin-edit-standard.component';
import { UpgradeComponent } from './upgrade/upgrade.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    AboutComponent,
    ContactComponent,
    AddCourseComponent,
    CourseComponent,
    CarouselComponent,
    CreateComponent,
    ReviewComponent,
    UserCoursesListComponent,
    UserEditCourseComponent,
    AdminComponent,
    AddBasicCourseComponent,
    AdminListBasicComponent,
    AdminEditBasicComponent,
    ManagersComponent,
    AdminAddManagerComponent,
    AdminReviewListComponent,
    BasicInfoComponent,
    IconsComponent,
    PicturesComponent,
    PromosComponent,
    DetailsComponent,
    ImageCropperComponent,
    AdminListStandardComponent,
    AdminUnapprovedListComponent,
    AdminApprovedListComponent,
    AdminAddStandardComponent,
    AdminEditStandardComponent,
    UpgradeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTooltipModule,
    MatMenuModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, MatSliderModule, MatToolbarModule,
    MatCardModule, MatSlideToggleModule, MatListModule, MatTableModule, MatExpansionModule,
    AppRoutingModule // NOTE KEEP ROUTING MODULE LAST
  ],
  providers: [],
  entryComponents: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
