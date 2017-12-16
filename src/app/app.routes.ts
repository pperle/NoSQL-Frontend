import { CanActivate, Router, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CourseComponent } from './course/course.component';
import { QuizComponent } from './course/quiz/quiz.component';
import { SessionDataManagerService } from './shared/session-data-manager.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private sessionDataManagerService: SessionDataManagerService, private router: Router) {
  }

  canActivate() {
    if (this.sessionDataManagerService.user != null) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'course', component: CourseComponent, canActivate: [LoginGuard] },
  { path: 'course/quiz', component: QuizComponent, canActivate: [LoginGuard] },
  { path: '**', redirectTo: '/login' }
];
