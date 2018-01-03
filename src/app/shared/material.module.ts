import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatMenuModule, MatRadioModule, MatSnackBarModule,
  MatToolbarModule, MatListModule
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
    MatListModule
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
    MatListModule
  ]
})
export class MaterialModule {
}
