import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, Quiz, Status, UserAnswer } from '../../shared/RestResults';
import { SessionDataManagerService } from '../../shared/session-data-manager.service';
import { MatSnackBar } from '@angular/material';
import { HttpLoginService } from '../../shared/services/http-login.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  quiz: Quiz;
  userAnswers: UserAnswer[] = [];

  constructor(private sessionDataManagerService: SessionDataManagerService,
              private snackBar: MatSnackBar,
              private http: HttpLoginService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      const courseId = params.courseId;
      const quizId = params.quizId;

      this.loadQuizFromBackend(courseId, quizId);
    });
  }

  private loadQuizFromBackend(courseId: string, quizId: string) {
    this.http.get('http://localhost:3000/users/' + this.sessionDataManagerService.user._id + '/quizs/' + quizId)
      .subscribe((message: Message) => {

        if (message.status === Status.SUCCESS) {
          this.sessionDataManagerService.quiz = message.data as Quiz;
          this.quiz = this.sessionDataManagerService.quiz;
          this.initUserAnswers();
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

  onUpdateCheckedSingeAnswer(questionIndex, answerIndex) {
    this.userAnswers[questionIndex].givenAnswerIndizies = [answerIndex];
  }

  onUpdateCheckedMultipleAnswers(questionIndex, answerIndex) {
    const position = this.userAnswers[questionIndex].givenAnswerIndizies.indexOf(answerIndex);
    if (position > -1) {
      this.userAnswers[questionIndex].givenAnswerIndizies.splice(position, 1);
    } else {
      this.userAnswers[questionIndex].givenAnswerIndizies.push(answerIndex);
    }
  }

  private initUserAnswers() {
    this.quiz.questions.forEach(question => {
      this.userAnswers.push({questionId: question._id, givenAnswerIndizies: []});
    });
  }

  sendResults() {
    this.http.post('http://localhost:3000/users/' + this.sessionDataManagerService.user._id + '/quizs',
      {
        quizId: this.quiz._id,
        answers: this.userAnswers
      }
    ).subscribe((message: Message) => {
      if (message.status === Status.SUCCESS) {
        this.router.navigate(['courses']);
      } else {
        this.snackBar.open((message.data as Error).message, '', {
          duration: 3500,
        });
      }
    });
  }
}
