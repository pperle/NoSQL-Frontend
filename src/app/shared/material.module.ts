import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatMenuModule, MatRadioModule, MatSnackBarModule,
  MatToolbarModule, MatListModule, MatDialogModule
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
    MatDialogModule
  ]
})
export class MaterialModule {
}
