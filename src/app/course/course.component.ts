import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionDataManagerService } from '../shared/session-data-manager.service';
import { Course, Message, Status } from '../shared/RestResults';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Ng2FloatBtn } from 'ng2-float-btn';
import { HttpLoginService } from '../shared/services/http-login.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  course: Course;

  mainButton: Ng2FloatBtn;
  buttons: Array<Ng2FloatBtn>;

  constructor(private sessionDataManagerService: SessionDataManagerService,
              private snackBar: MatSnackBar,
              private http: HttpLoginService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.loadCourseFromBackend(params.courseId);
    });

  }

  private loadCourseFromBackend(courseId: string) {
    // this.http.get('http://localhost:3000/user/' + this.sessionDataManagerService.user.id + '/course/' + courseId)
    this.http.get('http://localhost:3000/users/' + this.sessionDataManagerService.user._id + '/courses/' + courseId)
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

  private loadQuiz(quizId: string) {
     this.router.navigate(['users', this.sessionDataManagerService.user._id, 'quizs', quizId]);
  }

  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

}
