import { Component, OnInit } from '@angular/core';
import { SessionDataManagerService } from '../shared/session-data-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-course',
  templateUrl: './select-course.component.html',
  styleUrls: ['./select-course.component.css']
})
export class SelectCourseComponent implements OnInit {

  constructor(private sessionDataManagerService: SessionDataManagerService, private router: Router,) {
  }

  ngOnInit() {
  }

  addCourse() {
    // TODO create course in backend, return courseId for naviagtion
    this.router.navigate(['course', 'NoSQL']);
  }
}
