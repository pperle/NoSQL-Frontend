import { NewQuiz } from './../../../shared/RestResults';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';
import { decode } from '@angular/router/src/url_tree';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-add-quiz-dialog',
  templateUrl: './add-quiz-dialog.component.html',
  styleUrls: ['./add-quiz-dialog.component.css']
})
export class AddQuizDialogComponent implements OnInit {

  quiz: NewQuiz;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private matDilogRef: MatDialogRef<AddQuizDialogComponent>) {
  }

  ngOnInit() {
    this.quiz = {
      name: '',
      visibilityStartDate: new Date(),
      visibilityEndDate: null,
      questions: [{
        questionText: '',
        possibleAnwsers: ['', '', '', ''],
        correctAnwsers: []
      }]
    };
  }

  onUpdateQuizTitle($event) {
    this.quiz.name = $event.target.value;
  }

  onUpdateQuestion($event, questionIndex) {
    this.quiz.questions[questionIndex].questionText = $event.target.value;
  }

  onUpdateAnswer($event, answerIndex, questionIndex) {
    this.quiz.questions[questionIndex].possibleAnwsers[answerIndex] = $event.target.value;
  }

  addQuestion() {
    this.quiz.questions.push({
      questionText: '',
      possibleAnwsers: ['', '', '', ''],
      correctAnwsers: []
    });
  }

  public onSave() {
    this.matDilogRef.close(this.quiz);
  }

  onUpdateVisibilityStartDate(event: MatDatepickerInputEvent<Date>) {
    const newDate = event.target.value;
    this.quiz.visibilityStartDate = newDate;
    if (this.quiz.visibilityEndDate && this.quiz.visibilityEndDate < newDate) {
      this.quiz.visibilityEndDate = newDate;
    }
  }

  onUpdateVisibilityEndDate(event: MatDatepickerInputEvent<Date>) {
    const newDate = event.target.value;
    if (newDate < this.quiz.visibilityStartDate) {
      this.quiz.visibilityEndDate = this.quiz.visibilityStartDate;
    } else {
      this.quiz.visibilityEndDate = newDate;
    }
  }

  notBeforeToday(d: Date) {
    const today = new Date();
    return d > today;
  }

  notBeforeStartDate(d: Date) {
    if (this.quiz) {
      return d > this.quiz.visibilityStartDate;
    } else {
      const today = new Date();
      return d > today;
    }
  }

  onUpdateChecked($event, answerIndex: number, questionIndex: number) {
      if ($event.checked) {
        console.log(answerIndex);
        this.quiz.questions[questionIndex].correctAnwsers.push(answerIndex);
      } else if ($event.checked === false) {
        const ca = this.quiz.questions[questionIndex].correctAnwsers;
        let actualIndex = 0;
        for (let i = 0; i < ca.length; i++) {
          if (ca[i] === answerIndex) {
            actualIndex = i;
          }
        }
        this.quiz.questions[questionIndex].correctAnwsers.splice(actualIndex, 1);
      }
  }

}
