import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CourseComponent } from './course/course.component';
import { QuizComponent } from './course/quiz/quiz.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'course', component: CourseComponent },
  { path: 'course/quiz', component: QuizComponent },
  { path: '**', redirectTo: '/login' }
];
