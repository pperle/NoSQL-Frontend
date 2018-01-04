import { Component, OnInit } from '@angular/core';
import { Course, Question } from '../../shared/RestResults';
import { Ng2FloatBtn } from 'ng2-float-btn';
import { Router } from '@angular/router';
import { AddQuizDialogComponent } from './../quiz/add-quiz/add-quiz-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SessionDataManagerService } from '../../shared/session-data-manager.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  mainButton: Ng2FloatBtn;
  buttons: Array<Ng2FloatBtn>;
  currentFileId = 1;
  currentTestId = 1;
  currentTopicId = 1;
  newFileName = '';

  questions: Question = {
    question: 'firstquestion',
    answers: [
      'Hallo', 'GT'
    ]
  };

  course: Course = {
    id: 1,
    name: '',
    topics: [
      {
        id: this.currentTopicId,
        name: '',
        description: '',
        files: []
      }
    ],
    tests: [
      {
      id: this.currentTestId++,
      name: 'bonobo',
      questions: [{
        question: 'firstquestion',
        answers: [
          'Hallo', 'GT'
        ]
      }]
    }
  ]
  };

  constructor(private router: Router,
              private dialog: MatDialog) {
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
            id: ++this.currentTopicId,
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
        },
        label: 'Test',
      },
      {
        color: 'primary',
        iconName: 'send',
        onClick: () => {
          console.log(this.course);
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
    // TODO: actual upload via Filesystem;

    this.course.topics[topicIndex].files.push({
      id: this.currentFileId++,
      name: this.newFileName,
      link: '???' // TODO replace with the 'link'
    });
    this.newFileName = '';
  }

  onDeleteFile(topicIndex: number, fileIndex: number) {
    this.course.topics[topicIndex].files.splice(fileIndex, 1);
  }

  onDeleteTest(testIndex: number) {
    this.course.tests.splice(testIndex, 1);
  }

  onUpdateQuizTitle($event, questionIndex: number) {
    this.questions[questionIndex].name = $event.target.value;
  }

  openAddQuestionDialog() {
    this.dialog.open(AddQuizDialogComponent);
  }
}
