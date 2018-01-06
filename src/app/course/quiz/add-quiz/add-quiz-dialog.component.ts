import { NewQuiz } from './../../../shared/RestResults';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDatepickerInputEvent, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-quiz-dialog',
  templateUrl: './add-quiz-dialog.component.html',
  styleUrls: ['./add-quiz-dialog.component.css']
})
export class AddQuizDialogComponent implements OnInit {

  quiz: NewQuiz;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
              private matDialogRef: MatDialogRef<AddQuizDialogComponent>) {
  }

  ngOnInit() {
    this.quiz = {
      name: '',
      visibilityStartDate: null,
      visibilityEndDate: null,
      questions: [{
        questionText: '',
        possibleAnwsers: ['Antwort 1', 'Antwort 2', 'Antwort 3', 'Antwort 4'],
        correctAnwsers: []
      }]
    };
  }

  onUpdateQuizTitle($event) {
    this.quiz.name = $event.target.value;
  }

  onUpdateQuestion($event, questionIndex: number) {
    this.quiz.questions[questionIndex].questionText = $event.target.value;
  }

  onUpdateAnswer($event, questionIndex: number, answerIndex: number) {
    console.log(answerIndex);
    this.quiz.questions[questionIndex].possibleAnwsers[answerIndex] = $event.target.value;
    console.log(this.quiz.questions[questionIndex].possibleAnwsers);
  }

  addQuestion() {
    this.quiz.questions.push({
      questionText: '',
      possibleAnwsers: ['Antwort 1', 'Antwort 2', 'Antwort 3', 'Antwort 4'],
      correctAnwsers: []
    });
  }

  public onSave() {
    this.matDialogRef.close(this.quiz);
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
    return d >= today;
  }

  notBeforeStartDate(d: Date) {
    if (this.quiz) {
      return d >= this.quiz.visibilityStartDate;
    } else {
      const today = new Date();
      return d >= today;
    }
  }

  onUpdateChecked($event, questionIndex: number, answerIndex: number, ) {
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
