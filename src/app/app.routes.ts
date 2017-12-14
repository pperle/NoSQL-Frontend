import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CourseComponent } from './course/course.component';
import { QuizComponent } from './quiz/quiz.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'course', component: CourseComponent },
  { path: 'quiz', component: QuizComponent },
  { path: '**', redirectTo: '/login' }
];
