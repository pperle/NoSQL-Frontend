import { RegisterComponent } from './register/register.component';
import { CanActivate, Router, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CourseComponent } from './course/course.component';
import { QuizComponent } from './course/quiz/quiz.component';
import { SessionDataManagerService } from './shared/session-data-manager.service';
import { Injectable } from '@angular/core';
import { SelectCourseComponent } from './select-course/select-course.component';

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
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'course', component: SelectCourseComponent, canActivate: [LoginGuard]},
  {path: 'course/:courseId', component: CourseComponent, canActivate: [LoginGuard]},
  {path: 'course/:courseId/quiz/:quizId', component: QuizComponent, canActivate: [LoginGuard]},
  {path: '**', redirectTo: '/login'}
];
