import { Component, OnInit, Inject} from '@angular/core';
import { Message, Quiz, Status, Question } from '../../../shared/RestResults';
import { SessionDataManagerService } from '../../../shared/session-data-manager.service';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-add-quiz-dialog',
  templateUrl: './add-quiz-dialog.component.html',
  styleUrls: ['./add-quiz-dialog.component.css']
})
export class AddQuizDialogComponent implements OnInit {
  testName;
  quiz: Quiz;
  data: number;

  constructor(private sessionDataManagerService: SessionDataManagerService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.quiz = {
      id: this.data,
      name: this.testName,
      questions: []
    };
  }

  openDialog(testId: number) {
    this.data = testId;
    /*
    const dialogRef = this.dialog.open(, {
      width: '200px',
      height: '400px',
      data: { id: this.data }
    });
    */
  }

  sendResults() {
    console.log('send results to backend');
  }
}
