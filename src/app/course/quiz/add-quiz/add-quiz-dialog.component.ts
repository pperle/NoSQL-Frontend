import { NewQuiz } from './../../../shared/RestResults';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDatepickerInputEvent, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../login/login.component';

@Component({
  selector: 'app-add-quiz-dialog',
  templateUrl: './add-quiz-dialog.component.html',
  styleUrls: ['./add-quiz-dialog.component.css']
})
export class AddQuizDialogComponent implements OnInit {

  quiz: NewQuiz;

  quiznameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1)
  ]);
  quiznameMatcher = new MyErrorStateMatcher();

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
              private snackBar: MatSnackBar,
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
    this.quiz.questions[questionIndex].possibleAnwsers[answerIndex] = $event.target.value;
  }

  addQuestion() {
    this.quiz.questions.push({
      questionText: '',
      possibleAnwsers: ['Antwort 1', 'Antwort 2', 'Antwort 3', 'Antwort 4'],
      correctAnwsers: []
    });
  }

  public onSave() {
    if (this.everyQuestionHasAtLeastOneCorrectAnswer()) {
      if (this.quiz.questions.length === 0) {
        this.snackBar.open('Der Test benötigt MINDESTENS EINE Frage!', '', {
          duration: 4000,
        });
      } else {
        this.matDialogRef.close(this.quiz);
      }
    } else {
      this.snackBar.open('Jede Frage benötigt MINDESTENS EINE korrekte Antwort', '', {
        duration: 4000,
      });
    }
  }

  everyQuestionHasAtLeastOneCorrectAnswer(): boolean {
    let result = true;
    this.quiz.questions.forEach(element => {
      if (element.correctAnwsers.length === 0) {
        result = false;
      }
    });
    return result;
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

  correctTimezoneOffset(date: Date) {
      const offsetInMinutes: number = date.getTimezoneOffset();
      const offsetInHours: number = offsetInMinutes/60;
      const offsetCompensation: number = -1*offsetInHours*60*60*1000;

      date.setTime(date.getTime()+offsetCompensation);
  }

  notBeforeToday(d: Date) {
    const today = new Date();
    const referenceDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d >= referenceDate;
  }

  notBeforeStartDate(d: Date) {
    if (this.quiz) {
      return d >= this.quiz.visibilityStartDate;
    } else {
      const today = new Date();
      const referenceDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      return d >= referenceDate;
    }
  }

  onUpdateChecked($event, questionIndex: number, answerIndex: number) {
    if ($event.checked) {
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

  deleteQuestion(questionIndex: number) {
    this.quiz.questions.splice(questionIndex, 1);
  }

  isTestValid(): boolean {
    return this.quiznameFormControl.invalid || !this.areAllCorrectAnswersSet() || this.areAllTitlesEmpty();
  }

  private areAllTitlesEmpty(): boolean {
    return this.quiz.questions
      .filter(question => {
        return question.questionText.trim().length === 0;
      }).length !== 0;
  }

  private areAllCorrectAnswersSet(): boolean {
    return this.quiz.questions
      .filter(question => {
        return question.correctAnwsers.length === 0;
      }).length === 0;
  }
}
