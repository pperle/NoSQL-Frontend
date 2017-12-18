import { Injectable } from '@angular/core';
import { Course, Quiz, User } from './RestResults';

@Injectable()
export class SessionDataManagerService {
  public user: User;
  public course: Course;
  public quiz: Quiz;

  constructor() {
  }
}
