import { Component, OnInit } from '@angular/core';
import { NewCourse, Message, Status, CourseResult } from '../../shared/RestResults';
import { Ng2FloatBtn } from 'ng2-float-btn';
import { HttpLoginService } from '../../shared/services/http-login.service';
import { Router } from '@angular/router';
import { AddQuizDialogComponent } from './../quiz/add-quiz/add-quiz-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SessionDataManagerService } from '../../shared/session-data-manager.service';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  mainButton: Ng2FloatBtn;
  buttons: Array<Ng2FloatBtn>;
  newFileName = '';
  availableUsers = [];

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
              private fileDialog: MatDialog,
              private quizDialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllAvailableUsers();

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
          this.quizDialog.open(AddQuizDialogComponent, {
            height: '85%'
          }).afterClosed().subscribe(result => {
            if (result) {
              if (result === true) {

              } else {
                console.log(result);
                this.course.quizs.push(result);
              }
            }
          });
        },
        label: 'Test',
      },
      {
        color: 'primary',
        iconName: 'send',
        onClick: () => {

          this.http.post('http://localhost:3000/users/' + this.sessionDataManagerService.user._id + '/courses/', this.course
        ).subscribe((message: Message) => {
          if (message.status === Status.SUCCESS) {
            const addedCourse =  message.data as CourseResult;
            this.router.navigate(['course/' + addedCourse._id]);
          } else {
            this.snackBar.open((message.data as Error).message, '', {
              duration: 3500,
            });
            this.router.navigate(['course']);
          }
        });
        },
        label: 'Anlegen'
      }
    ];

  }

  onUpdateCourseName($event) {
    this.course.name = $event.target.value;
  }

  onUpdateTopicTitle($event, topicIndex: number) {
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
      height: '85%'
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

  getAllAvailableUsers() {
    this.http.get('http://localhost:3000/users/' + this.sessionDataManagerService.user._id + '/available')
    .subscribe((message: Message) => {
      if (message.status === Status.SUCCESS) {
        const users =  message.data as string[];
        console.log(users);
        this.availableUsers = users;
      } else {
        this.snackBar.open((message.data as Error).message, '', {
          duration: 3500,
        });
        this.router.navigate(['course']);
      }
  }
}
