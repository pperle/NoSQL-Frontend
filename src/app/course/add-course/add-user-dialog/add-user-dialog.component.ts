import { SessionDataManagerService } from './../../../shared/session-data-manager.service';
import { Message, Status } from './../../../shared/RestResults';
import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { HttpLoginService } from '../../../shared/services/http-login.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

    users: string[];
    usersToAdd: string[];
    @ViewChild('selectedUsers') selectionList;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private sessionDataManagerService: SessionDataManagerService,
    private http: HttpLoginService,
    private snackBar: MatSnackBar,
    private matDialogRef: MatDialogRef<AddUserDialogComponent>) {
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/users/' + this.sessionDataManagerService.user._id + '/available')
    .subscribe((message: Message) => {
      if (message.status === Status.SUCCESS) {
        const availableUsers = message.data as string[];
        this.usersToAdd = this.dialogData;
        if (this.usersToAdd != null) {
            this.users = [];
            availableUsers.forEach(element => {
                if (!this.usersToAdd.includes(element)) {
                   this.users.push(element);
                }
            });
        } else {
            this.users = availableUsers;
        }
      } else {
        this.snackBar.open((message.data as Error).message, '', {
          duration: 3500,
        });
      }
    });
  }

  public onSave() {
    this.selectionList.selectedOptions._selection.forEach(element => {
        this.usersToAdd.push(element.value);
    });
    this.matDialogRef.close(this.usersToAdd);
  }

}
