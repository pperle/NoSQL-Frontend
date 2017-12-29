import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Message, Status, User } from '../shared/RestResults';
import { Router } from '@angular/router';
import { SessionDataManagerService } from '../shared/session-data-manager.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1)
  ]);

  usernameMatcher = new MyErrorStateMatcher();
  passwordMatcher = new MyErrorStateMatcher();


  hidePassword = true;

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private router: Router,
              private sessionDataManagerService: SessionDataManagerService) {
  }

  ngOnInit() {
  }


  login(username: string, password: string) {
    this.http.post('http://localhost:3000/login',
      {
        username: username,
        password: Md5.hashStr(password)
      }
    ).subscribe((message: Message) => {
      if (message.status === Status.SUCCESS) {
        this.sessionDataManagerService.user = message.data as User;
        this.router.navigate(['course']);
      } else {
        this.snackBar.open((message.data as Error).message, '', {
          duration: 3500,
        });
      }
    });
  }
}
