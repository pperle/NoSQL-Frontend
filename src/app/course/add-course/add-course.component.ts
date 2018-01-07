import { Component, OnInit } from '@angular/core';
import { Message, NewCourse, Status } from '../../shared/RestResults';
import { Ng2FloatBtn } from 'ng2-float-btn';
import { HttpLoginService } from '../../shared/services/http-login.service';
import { Router } from '@angular/router';
import { AddQuizDialogComponent } from './../quiz/add-quiz/add-quiz-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SessionDataManagerService } from '../../shared/session-data-manager.service';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../login/login.component';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  mainButton: Ng2FloatBtn;
  buttons: Array<Ng2FloatBtn>;
  newFileName = '';

  courseFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1)
  ]);

  courseTitleMatcher = new MyErrorStateMatcher();
  topicMatcher = new MyErrorStateMatcher();

  course: NewCourse = {
    name: '',
    topics: [
      {
        name: '',
        description: '',
        files: []
      }
    ],
    quizs: [],
    users: []
  };

  constructor(private router: Router,
              private http: HttpLoginService,
              private sessionDataManagerService: SessionDataManagerService,
              private snackBar: MatSnackBar,
              private userDialog: MatDialog,
              private fileDialog: MatDialog,
              private quizDialog: MatDialog) {
  }

  ngOnInit() {

    this.mainButton = {
      color: 'primary',
      iconName: 'add'
    };

    this.buttons = [
      {
        color: 'primary',
        iconName: 'note',
        onClick: () => {
          this.course.topics.push({
            name: '',
            description: '',
            files: []
          });
        },
        label: 'Thema'
      },
      {
        color: 'primary',
        iconName: 'assignment',
        onClick: () => {
          this.openQuizDialog();
        },
        label: 'Test',
      },
      {
        color: 'primary',
        iconName: 'send',
        onClick: () => {
          this.checkValidationBeforeSending();
        },
        label: 'Anlegen'
      }
    ];

  }

  openQuizDialog() {
    this.quizDialog.open(AddQuizDialogComponent).afterClosed().subscribe(result => {
      if (result) {
        if (result !== true) {
          this.course.quizs.push(result);
        }
      }
    });
  }

  checkValidationBeforeSending() {
    if (this.courseFormControl.invalid) {
      this.throwCorrectSnackBarMessage();
    } else {
      if (this.course.topics.length === 0) {
        this.snackBar.open('Es wird mindestens ein Thema benötig.', '', {
          duration: 3500,
        });
      } else {
        const allTopicsHaveAName = this.course.topics
          .filter(topic => topic.name.trim().length === 0)
          .length === 0;
        if (!allTopicsHaveAName) {
          this.snackBar.open('Alle Themen benötigen einen Titel.', '', {
            duration: 3500,
          });
        } else {
          this.sendCourse();
        }
      }
    }
  }

  throwCorrectSnackBarMessage() {
    if (this.courseFormControl.invalid) {
      this.snackBar.open('Ein Kursname wird benötig', '', {
        duration: 3500,
      });
    }
  }

  sendCourse() {
    if (!this.course.users.includes(this.sessionDataManagerService.user._id)) {
      this.course.users.push(this.sessionDataManagerService.user._id);
    }
    this.http.post('http://localhost:3000/users/' + this.sessionDataManagerService.user._id + '/courses/', this.course)
      .subscribe((message: Message) => {
        if (message.status === Status.SUCCESS) {
          this.router.navigate(['courses']);
        } else {
          this.snackBar.open((message.data as Error).message, '', {
            duration: 3500,
          });
        }
      });
  }

  onUpdateCourseName($event) {
    this.course.name = $event.target.value;
  }

  onUpdateTopicTitle($event, topicIndex: number) {
    console.log(this.course.topics);


    console.log(topicIndex, $event);
    this.course.topics[topicIndex].name = $event.target.value;
  }

  onUpdateTopicDescription($event, topicIndex: number) {
    this.course.topics[topicIndex].description = $event.target.value;
  }

  onDeleteTopic(topicIndex: number) {
    this.course.topics.splice(topicIndex, 1);
  }

  onUpdateFileName($event) {
    this.newFileName = $event.target.value;
  }

  onUploadFile($event, topicIndex) {
    this.fileDialog.open(FileUploadDialogComponent, {
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result !== true) {
        this.course.topics[topicIndex].files.push(result);
      }
    });
  }

  onDeleteFile(topicIndex: number, fileIndex: number) {
    this.course.topics[topicIndex].files.splice(fileIndex, 1);
  }

  onDeleteQuiz(quizIndex: number) {
    this.course.quizs.splice(quizIndex, 1);
  }

  onRemoveUser(userIndex: number) {
    this.course.users.splice(userIndex, 1);
  }

  onAddUserToCourse() {
    this.userDialog.open(AddUserDialogComponent, {
      autoFocus: false,
      data: this.course.users
    }).afterClosed().subscribe(result => {
      if (result !== true) {
        this.course.users = result;
      }
    });
  }
}
