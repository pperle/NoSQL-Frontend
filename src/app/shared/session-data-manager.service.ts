import { Injectable } from '@angular/core';
import { Course, User } from './RestResults';

@Injectable()
export class SessionDataManagerService {
  public user: User;
  public course: Course;

  constructor() {
  }
}