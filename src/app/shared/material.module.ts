import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatNativeDateModule, MatRadioModule, MatSnackBarModule, MatTableModule, MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatSnackBarModule,
    MatListModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatSnackBarModule,
    MatListModule,
    MatDialogModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule
  ]
})
export class MaterialModule {
}
