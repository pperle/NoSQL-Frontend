import { RegisterComponent } from './register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { LoginGuard, routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { CourseComponent } from './course/course.component';
import { QuizComponent } from './course/quiz/quiz.component';
import { AddQuizDialogComponent } from './course/quiz/add-quiz/add-quiz-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { SessionDataManagerService } from './shared/session-data-manager.service';
import { SelectCourseComponent } from './select-course/select-course.component';
import { Ng2FloatBtnModule } from 'ng2-float-btn';
import { AddCourseComponent } from './course/add-course/add-course.component';
import { HttpLoginService } from './shared/services/http-login.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CourseComponent,
    QuizComponent,
    SelectCourseComponent,
    AddCourseComponent,
    AddQuizDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    Ng2FloatBtnModule
  ],
  providers: [
    SessionDataManagerService,
    LoginGuard,
    HttpLoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
