import { NewFile } from './../../../shared/RestResults';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.css']
})
export class FileUploadDialogComponent implements OnInit {
    static file: NewFile;
    static fileData;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private matDialogRef: MatDialogRef<FileUploadDialogComponent>) {
  }

  ngOnInit() {
    FileUploadDialogComponent.file = {
      name: '',
      visibilityStartDate: null,
      visibilityEndDate: null,
      data: []
    };
  }

  onUpdateFileTitle($event) {
    FileUploadDialogComponent.file.name = $event.target.value;
  }

  onUpdateVisibilityStartDate(event: MatDatepickerInputEvent<Date>) {
      const newDate = event.target.value;
      FileUploadDialogComponent.file.visibilityStartDate = newDate;
      if (FileUploadDialogComponent.file.visibilityEndDate && FileUploadDialogComponent.file.visibilityEndDate < newDate) {
        FileUploadDialogComponent.file.visibilityEndDate = newDate;
      }
   }

   onUpdateVisibilityEndDate(event: MatDatepickerInputEvent<Date>) {
     const newDate = event.target.value;
     if (newDate < FileUploadDialogComponent.file.visibilityStartDate) {
       FileUploadDialogComponent.file.visibilityEndDate = FileUploadDialogComponent.file.visibilityStartDate;
     } else {
       FileUploadDialogComponent.file.visibilityEndDate = newDate;
     }
   }

   readSingleFile($event) {
      FileUploadDialogComponent.fileData = $event.target.files[0];
       /*
      const selectedFile = $event.target.files[0];
      const reader = new FileReader();

      if (!selectedFile) {
        return;
      }
      reader.onload = function(e: Event) {
        console.log(reader.result);
      };

      reader.readAsText(selectedFile);
      */
   }


   notBeforeToday(d: Date) {
     const today = new Date();
     return d >= today;
   }

   notBeforeStartDate(d: Date) {
     if (FileUploadDialogComponent.file) {
       return d >= FileUploadDialogComponent.file.visibilityStartDate;
     } else {
       const today = new Date();
       return d >= today;
     }
   }

  addData($event) {
    FileUploadDialogComponent.file.data = $event.target.value;
  }

  public onSave() {
    const reader = new FileReader();
    const test:MatDialogRef<FileUploadDialogComponent> = this.matDialogRef;

    if (!FileUploadDialogComponent.fileData) {
      return;
    }
    reader.onload = function(e: Event) {
      FileUploadDialogComponent.file.data = reader.result;
      test.close(FileUploadDialogComponent.file);
    };
    reader.readAsText(FileUploadDialogComponent.fileData);
  } 

}
