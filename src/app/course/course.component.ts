import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionDataManagerService } from '../shared/session-data-manager.service';
import { Course, Message, Status } from '../shared/RestResults';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: Course;

  constructor(private sessionDataManagerService: SessionDataManagerService, private snackBar: MatSnackBar, private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/user/' + this.sessionDataManagerService.user.id + '/course/' + 123)
      .subscribe((message: Message) => {

        if (message.status === Status.SUCCESS) {
          this.sessionDataManagerService.course = message.data as Course;
          this.course = this.sessionDataManagerService.course;
        } else {
          this.snackBar.open((message.data as Error).message, '', {
            duration: 3500,
          });
        }
      });
  }

}
