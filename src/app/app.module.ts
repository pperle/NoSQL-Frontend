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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CourseComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    SessionDataManagerService,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
