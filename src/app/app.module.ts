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
import { HttpClientModule } from '@angular/common/http';
import { SessionDataManagerService } from './shared/session-data-manager.service';
import { SelectCourseComponent } from './select-course/select-course.component';
import { Ng2FloatBtnModule } from 'ng2-float-btn';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CourseComponent,
    QuizComponent,
    SelectCourseComponent
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
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
