import { Component } from '@angular/core';
import { MyErrorStateMatcher } from '../login/login.component';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Message, Status, UserLevel } from '../shared/RestResults';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

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

  userLevel = UserLevel.STUDENT;

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  register(id: string, password: string) {

    console.log({
      id: id,
      password: Md5.hashStr(password),
      level: this.userLevel
    });

    this.http.post('http://localhost:3000/users/register/',
      {
        id: id,
        password: Md5.hashStr(password),
        level: this.userLevel
      }
    ).subscribe((message: Message) => {
      if (message.status === Status.SUCCESS) {
        this.router.navigate(['login']);
      } else {
        this.snackBar.open((message.data as Error).message, '', {
          duration: 3500,
        });
      }
    });
  }
}
