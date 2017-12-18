import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Message, Quiz, Status } from '../../shared/RestResults';
import { SessionDataManagerService } from '../../shared/session-data-manager.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  quiz: Quiz;

  constructor(private sessionDataManagerService: SessionDataManagerService,
              private snackBar: MatSnackBar,
              private http: HttpClient,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      const courseId = params.courseId;
      const quizId = params.quizId;

      this.loadQuizFromBackend(courseId, quizId);
    });
  }

  private loadQuizFromBackend(courseId: string, quizId: string) {
    this.http.get('http://localhost:3000/user/' + this.sessionDataManagerService.user.id + '/course/' + courseId + '/quiz/' + quizId)
      .subscribe((message: Message) => {

        if (message.status === Status.SUCCESS) {
          this.sessionDataManagerService.quiz = message.data as Quiz;
          this.quiz = this.sessionDataManagerService.quiz;
        } else {
          this.snackBar.open((message.data as Error).message, '', {
            duration: 3500,
          });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  sendResults() {
    console.log('send results to backend');
  }
}
