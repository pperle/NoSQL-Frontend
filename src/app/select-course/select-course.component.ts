import { Component, OnInit } from '@angular/core';
import { SessionDataManagerService } from '../shared/session-data-manager.service';
import { Router } from '@angular/router';
import { CourseMetadata, Message, Status, UserLevel } from '../shared/RestResults';
import { MatSnackBar } from '@angular/material';
import { HttpLoginService } from '../shared/services/http-login.service';

@Component({
  selector: 'app-select-course',
  templateUrl: './select-course.component.html',
  styleUrls: ['./select-course.component.css']
})
export class SelectCourseComponent implements OnInit {
  courses: CourseMetadata[];

  constructor(private sessionDataManagerService: SessionDataManagerService,
              private snackBar: MatSnackBar,
              private http: HttpLoginService,
              private router: Router) {
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/users/' + this.sessionDataManagerService.user._id + '/courses')
      .subscribe((message: Message) => {
        if (message.status === Status.SUCCESS) {
          this.courses = message.data as CourseMetadata[];
          this.autoRedirectStudent();
        } else {
          this.snackBar.open((message.data as Error).message, '', {
            duration: 3500,
          });
        }
      });
  }

  private autoRedirectStudent() {
    if (this.sessionDataManagerService.user.level === UserLevel.STUDENT) {
      this.router.navigate(['courses', this.courses[0].name]);
    }
  }

  addCourse() {
    // TODO create course in backend, return courseId for naviagtion
    this.router.navigate(['courses', 'add']);
  }

  redirectToCourse(index: number) {
    this.router.navigate(['courses', this.courses[index].name]);
  }
}
