import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from '../services/course.service';
import { CourseListing } from '../models/CourseListing';
import { Member } from '../models/Member';
import { MemberService } from '../services/member.service';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatInput } from '@angular/material';

@Component({
  selector: 'app-admin-add-manager',
  templateUrl: './admin-add-manager.component.html',
  styleUrls: ['./admin-add-manager.component.scss']
})
export class AdminAddManagerComponent implements OnInit, OnDestroy {

  // these are the 'master course with full list'
  courses: CourseListing[];
  members: Member[];

  // these store the partial list for display on page
  courseList: any[] = [];
  memberList: Member[] = [];
  selectedManager: number;
  selectedCourse: number;
  subscriptions: Subscription[] = [];
  loading: boolean;
  memberIdInput;
  courseIdInput;

  constructor(
    private courseService: CourseService,
    private memberService: MemberService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loading = true;
    this.selectedCourse = 0;
    this.selectedManager = 0;
    this.getCourses();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Retrieve all the available courses in the db. Only basic info.
   */
  getCourses() {
    this.subscriptions.push(this.courseService.getAll().subscribe(response => {
      if (response.status === 200) {
        this.courses = response.payload;
      } else {
        console.error(response);
        alert('Sorry there was a problem getting courses from database');
      }
      this.getMembers();
    }));
  }

  /**
   * Retrieve all the members in the db. Only basic info.
   */
  getMembers() {
    this.subscriptions.push(this.memberService.getAll().subscribe(response => {
      if (response.status === 200) {
        this.members = response.payload;
      } else {
        console.error(response);
        alert('Sorry there was a problem getting members from database');
      }
      this.loading = false;
    }));
  }

  /**
   * Add the member ID selected to be the 'owner' of the course selected. Now the member will be that course's 'manager'
   */
  linkThem() {
    if (this.selectedCourse === 0) {
      alert('Please choose a course');
    } else if (this.selectedManager === 0) {
      alert('Please choose a member to assign as course manager');
    } else {
      this.subscriptions.push(this.courseService.updateManager(this.selectedCourse, this.selectedManager).subscribe(response => {
        if (response.status === 200) {
          this.snackbar.open('Success, Manager/Owner added to course.', '', {duration: 1200});
          this.courseIdInput.value = null;
          this.memberIdInput.value = null;
        } else {
          alert('Failure, No changes were made.');
          console.error(response);
        }
      }));
    }
  }

  /**
   * Search the master list of all courses for the ones with a name at least starting with user input text
   * @param name User input text
   */
  searchCourses(name: string) {
    this.courseList = [];
    if (name !== '') {
      const found = this.courses.filter((course) => {
        if (course.fullName.toLowerCase().startsWith(name.toLowerCase())) {
          return course;
        }
      });
      found.forEach(element => {
        const basic: Basic = {id: element.id, name: element.fullName};
        this.courseList.push(basic);
      });
    }
  }

  searchMembers(name: string) {
    this.memberList = [];
    if (name !== '') {
      const found = this.members.filter((member) => {
        if (member.fullName.toLowerCase().startsWith(name.toLowerCase())) {
          return member;
        }
      });
      found.forEach(element => {
        this.memberList.push(element);
      });
    }
  }

  /**
   * User has chosen a course. Add full name to input and set the variables for name and id that will be used for db function.
   * @param course Course selected, obj with 'name' and 'id'
   */
  courseSelected(course: any, input: HTMLInputElement) {
    input.value = course.name;
    this.selectedCourse = course.id;
    this.courseIdInput = input;
    this.courseList = [];
  }

  /**
   * User has chosen a member. Add full name to input and set the variables for name and id that will be used for db function.
   * @param member Membr selected, obj with 'fullName' and 'id'
   */
  memberSelected(member: Member, input: HTMLInputElement) {
    input.value = member.fullName;
    this.selectedManager = member.memberId;
    this.memberIdInput = input;
    this.memberList = [];
  }



}

interface Basic {
    id: number;
    name: string;
}
