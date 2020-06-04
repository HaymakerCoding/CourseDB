import { Component, OnInit, Sanitizer, SecurityContext, Directive, AfterViewChecked,
  Input, OnDestroy, ViewChild, ElementRef, AfterViewInit, Inject} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../models/Course';
import { Promo } from '../models/Promo';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})

/**
 * Build a dynamic course page based on ID param.
 */
export class CourseComponent implements OnInit, OnDestroy {

  @Input() id: number;
  course: Course;
  courseId: number;
  subscriptions: Subscription[] = [];
  promos: Promo[];
  promoSrcs: any[] = [];
  loading: boolean;
  boxHeight: number;
  slides: string[] = [];
  HTMLloaded: boolean;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,

  ) { }

  ngOnInit() {
    this.courseId = 0;
    this.loading = true;
    this.setId();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Get course ID from router param and set to local variable, IF no ID is passed to the component.
   */
  setId() {
    if (this.id === undefined) {
      this.route.paramMap.subscribe(
        (params: ParamMap) => {
          this.courseId = +params.get('id');
          this.getCourse();
        },
        error => { console.log(error); },
        () => {
        }
      );
    } else {
      this.courseId = this.id;
      this.getCourse();
    }
  }

  /**
   * Use course ID to get the associated course data from the serivce
   */
  getCourse() {
    this.subscriptions.push(this.courseService.get(this.courseId).subscribe(response => {
      if (response.status === 200) {
        this.course = response.payload[0];
        if (this.course.slider1) {
          this.slides.push(this.course.slider1);
        }
        if (this.course.slider2) {
          this.slides.push(this.course.slider2);
        }
        if (this.course.slider3) {
          this.slides.push(this.course.slider3);
        }
        if (this.course.slider4) {
          this.slides.push(this.course.slider4);
        }
        if (this.course.slider5) {
          this.slides.push(this.course.slider5);
        }
        if (this.course.slider6) {
          this.slides.push(this.course.slider6);
        }
        this.loading = false;

      } else  {
        alert('Sorry there was a problem retrieving this course. Please try back later.');
        console.error(response);
      }
    }));
  }


}
