import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionDataManagerService } from '../shared/session-data-manager.service';
import { CourseResult, Message, QuizUserResult, Status, UserLevel } from '../shared/RestResults';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { HttpLoginService } from '../shared/services/http-login.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  course: CourseResult;
  displayedColumns = ['user', 'points'];
  quizUserResultMap: Map<string, MatTableDataSource<QuizUserResult>> = new Map();

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
    this.http.get('http://localhost:3000/users/' + this.sessionDataManagerService.user._id + '/courses/' + courseId)
      .subscribe((message: Message) => {
          if (message.status === Status.SUCCESS) {
            this.sessionDataManagerService.course = message.data as CourseResult;
            this.course = this.sessionDataManagerService.course;

            if (this.sessionDataManagerService.user.level === UserLevel.PROFESSOR) {
              this.course.quizs.forEach(quiz => {
                this.http.get('http://localhost:3000/dashboards/users/' + this.sessionDataManagerService.user._id + '/courses/' + courseId + '/quizs/' + quiz._id)
                  .subscribe((quiz_message: Message) => {
                      if (quiz_message.status === Status.SUCCESS) {
                        const myDataSource = new MatTableDataSource<QuizUserResult>();
                        myDataSource.data = quiz_message.data as QuizUserResult[];
                        this.quizUserResultMap.set(quiz._id, myDataSource);
                      }
                    }
                  );
              });
            }
          } else {
            this.snackBar.open((message.data as Error).message, '', {
              duration: 3500,
            });
          }
        }
      );
  }

  loadQuiz(quizId: string) {
    this.router.navigate(['users', this.sessionDataManagerService.user._id, 'quizs', quizId]);
  }

  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

}
