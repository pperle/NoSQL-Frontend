import { NewFile } from './../../../shared/RestResults';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.css']
})
export class FileUploadDialogComponent implements OnInit {

    file: NewFile;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private matDialogRef: MatDialogRef<FileUploadDialogComponent>) {
  }

  ngOnInit() {
    this.file = {
      name: '',
      visibilityStartDate: new Date(),
      visibilityEndDate: null,
      data: []
    };
  }

  onUpdateFileTitle($event) {
    this.file.name = $event.target.value;
  }

  onUpdateVisibilityStartDate(event: MatDatepickerInputEvent<Date>) {
      const newDate = event.target.value;
      this.file.visibilityStartDate = newDate;
      if (this.file.visibilityEndDate && this.file.visibilityEndDate < newDate) {
        this.file.visibilityEndDate = newDate;
      }
   }

   onUpdateVisibilityEndDate(event: MatDatepickerInputEvent<Date>) {
     const newDate = event.target.value;
     if (newDate < this.file.visibilityStartDate) {
       this.file.visibilityEndDate = this.file.visibilityStartDate;
     } else {
       this.file.visibilityEndDate = newDate;
     }
   }

   notBeforeToday(d: Date) {
     const today = new Date();
     return d > today;
   }

   notBeforeStartDate(d: Date) {
     if (this.file) {
       return d > this.file.visibilityStartDate;
     } else {
       const today = new Date();
       return d > today;
     }
   }

  addData($event) {
    this.file.data = $event.target.value;
  }

  public onSave() {
    this.matDialogRef.close(this.file);
  }

}
