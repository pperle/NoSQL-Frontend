import { Component } from '@angular/core';
import { getSalt, hash } from 'bcryptjs';
import { MyErrorStateMatcher } from '../login/login.component';
import { Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Message, Status } from '../shared/RestResults';

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

      usernameMatcher = new MyErrorStateMatcher();
      passwordMatcher = new MyErrorStateMatcher();

      hidePassword = true;

      constructor(private http: HttpClient,
                  private snackBar: MatSnackBar,
                  private router: Router) {
      }

register(id: string, password: string) {

    const newPassword = hash(password, getSalt('mySaltySalt'));

    this.http.post('http://localhost:3000/user/register/', {
        id: id,
        password: newPassword
      }).subscribe((message: Message) => {
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
