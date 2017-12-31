import { Component, OnInit } from '@angular/core';
import { SessionDataManagerService } from '../shared/session-data-manager.service';
import { Router } from '@angular/router';
import { Course, Message, Status } from '../shared/RestResults';
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
              private router: Router,) {
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/user/' + this.sessionDataManagerService.user.id + '/courses/')
      .subscribe((message: Message) => {
        if (message.status === Status.SUCCESS) {
          this.courses = message.data as Course[];
        } else {
          this.snackBar.open((message.data as Error).message, '', {
            duration: 3500,
          });
        }
      });
  }

  addCourse() {
    // TODO create course in backend, return courseId for naviagtion
    this.router.navigate(['course', 'NoSQL']);
  }

  redirectToCourse(index: number) {
    this.router.navigate(['course', this.courses[index].name]);
  }
}
