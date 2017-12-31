import { Component, OnInit } from '@angular/core';
import { Course } from '../../shared/RestResults';
import { Ng2FloatBtn } from 'ng2-float-btn';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  mainButton: Ng2FloatBtn;
  buttons: Array<Ng2FloatBtn>;

  course: Course = {
    id: 1,
    name: '',
    topics: [
      {
        id: 1,
        name: '',
        description: '',
        files: []
      }
    ],
    tests: []
  };

  constructor() {
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
            id: 1,
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
          alert('Jemand sollte einen neuen Test anlegen.');
        },
        label: 'Test'
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

}
