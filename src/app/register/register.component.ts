import { Component } from '@angular/core';
import { genSalt, hash } from 'bcryptjs';
import { MyErrorStateMatcher } from '../login/login.component';
import { Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Message, Status } from '../shared/RestResults';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    usernameFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(7)
      ]);

      passwordFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]);

      userLevelFormControl = new FormControl('', [
        Validators.required,
      ]);

      usernameMatcher = new MyErrorStateMatcher();
      passwordMatcher = new MyErrorStateMatcher();
      userLevelMatcher = new MyErrorStateMatcher();

      hidePassword = true;

      constructor(private http: HttpClient,
                  private snackBar: MatSnackBar,
                  private router: Router) {
      }

register(id: string, password: string) {
    this.http.post('http://localhost:3000/users/register/',
    {
      id: id,
      password: Md5.hashStr(password)
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
