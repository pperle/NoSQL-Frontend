import { NewFile } from './../../../shared/RestResults';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDatepickerInputEvent, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.css']
})
export class FileUploadDialogComponent implements OnInit {
    file: NewFile;
    fileData;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private matDialogRef: MatDialogRef<FileUploadDialogComponent>) {
  }

  ngOnInit() {
    this.file = {
      name: '',
      visibilityStartDate: null,
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
       this.file.visibilityStartDate = newDate;
     } else {
       this.file.visibilityEndDate = newDate;
     }
   }

   correctTimezoneOffset(date: Date) {
       const offsetInMinutes: number = date.getTimezoneOffset();
       const offsetInHours: number = offsetInMinutes/60;
       const offsetCompensation: number = -1*offsetInHours*60*60*1000;

       date.setTime(date.getTime()+offsetCompensation);
   }

   readSingleFile($event) {
      this.file.name = $event.target.files[0].name;
      this.fileData = $event.target.files[0];
   }


   notBeforeToday(d: Date) {
    const today = new Date();
    const referenceDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d >= referenceDate;
  }

  notBeforeStartDate(d: Date) {
    if (this.file) {
      return d >= this.file.visibilityStartDate;
    } else {
      const today = new Date();
      const referenceDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      return d >= referenceDate;
    }
  }

  addData($event) {
    this.file.data = $event.target.value;
  }

  public onSave() {
    const reader = new FileReader();
    const matDialogRef: MatDialogRef<FileUploadDialogComponent> = this.matDialogRef;
    const file = this.file;

    reader.onloadend = function(e: Event) {
        file.data = reader.result;
        matDialogRef.close(file);
    };
    reader.readAsDataURL(this.fileData);
  }

}
