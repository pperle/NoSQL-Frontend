import { Injectable } from '@angular/core';
import { CourseResult, LoginResult, Quiz } from './RestResults';

@Injectable()
export class SessionDataManagerService {
  public user: LoginResult;
  public course: CourseResult;
  public quiz: Quiz;

  constructor() {
  }
}
