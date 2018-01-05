import { RegisterComponent } from './register/register.component';
import { CanActivate, Router, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CourseComponent } from './course/course.component';
import { QuizComponent } from './course/quiz/quiz.component';
import { AddQuizDialogComponent } from './course/quiz/add-quiz/add-quiz-dialog.component';
import { SessionDataManagerService } from './shared/session-data-manager.service';
import { Injectable } from '@angular/core';
import { SelectCourseComponent } from './select-course/select-course.component';
import { AddCourseComponent } from './course/add-course/add-course.component';

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
  {path: 'courses', component: SelectCourseComponent, canActivate: [LoginGuard]},
  {path: 'courses/add', component: AddCourseComponent, canActivate: [LoginGuard]},
  {path: 'courses/:courseId', component: CourseComponent, canActivate: [LoginGuard]},
  {path: 'courses/:courseId/quizes/add', component: AddQuizDialogComponent, canActivate: [LoginGuard]},
  {path: 'users/:userId/quizs/:quizId', component: QuizComponent, canActivate: [LoginGuard]},
  {path: '**', redirectTo: '/login'}
];
