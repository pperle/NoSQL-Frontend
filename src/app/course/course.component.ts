import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionDataManagerService } from '../shared/session-data-manager.service';
import { Course, Message, Status } from '../shared/RestResults';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Ng2FloatBtn } from 'ng2-float-btn';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  course: Course;

  mainButton: Ng2FloatBtn;
  buttons: Array<Ng2FloatBtn>;

  constructor(private sessionDataManagerService: SessionDataManagerService,
              private snackBar: MatSnackBar,
              private http: HttpClient,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.loadCourseFromBackend(params.courseId);
    });

    this.mainButton = {
      color: 'primary',
      iconName: 'add'
    };

    this.buttons = [
      {
        color: 'primary',
        iconName: 'note',
        onClick: () => {
          alert('Jemand sollte ein neues Thema anlegen.');
        },
        label: 'Thema'
      },
      {
        color: 'primary',
        iconName: 'assignment',
        onClick: () => {
          alert('Jemand sollte einen neuen Test anlegen.');
        },
        label: 'Test'
      }
    ];

  }

  private loadCourseFromBackend(courseId: string) {
    // this.http.get('http://localhost:3000/user/' + this.sessionDataManagerService.user.id + '/course/' + courseId)
    this.http.get('http://localhost:3000/user/' + 1 + '/course/' + courseId)
      .subscribe((message: Message) => {

        if (message.status === Status.SUCCESS) {
          this.sessionDataManagerService.course = message.data as Course;
          this.course = this.sessionDataManagerService.course;
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

  onUpdateCourseName($event) {
    console.log($event.target.value);

  }

  onUpdateTopicTitle($event, topicIndex: number) {
    console.log($event.target.value, topicIndex);
  }

  onUpdateTopicDescription($event, topicIndex: number) {
    console.log($event.target.value, topicIndex);
  }

  onDeleteTopic(topicIndex: number) {
    console.log('Delete', topicIndex);
  }
}
