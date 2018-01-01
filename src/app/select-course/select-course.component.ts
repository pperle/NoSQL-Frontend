import { Component, OnInit } from '@angular/core';
import { SessionDataManagerService } from '../shared/session-data-manager.service';
import { Router } from '@angular/router';
import { Course, Message, Status, UserLevel } from '../shared/RestResults';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-select-course',
  templateUrl: './select-course.component.html',
  styleUrls: ['./select-course.component.css']
})
export class SelectCourseComponent implements OnInit {
  courses: Course[];

  constructor(private sessionDataManagerService: SessionDataManagerService,
              private snackBar: MatSnackBar,
              private http: HttpClient,
              private router: Router) {
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/users/' + this.sessionDataManagerService.user._id + '/courses/all/list')
      .subscribe((message: Message) => {
        if (message.status === Status.SUCCESS) {
          this.courses = message.data as Course[];
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
    this.router.navigate(['courses', 'NoSQL']);
  }

  redirectToCourse(index: number) {
    this.router.navigate(['courses', this.courses[index].name]);
  }
}
