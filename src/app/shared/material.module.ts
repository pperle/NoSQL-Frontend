import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatRadioModule, MatSnackBarModule, MatToolbarModule
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
    MatCheckboxModule
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
    MatCheckboxModule
  ]
})
export class MaterialModule {
}
