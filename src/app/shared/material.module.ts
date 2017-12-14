import { NgModule } from '@angular/core';

import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatMenuModule, MatRadioModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule
  ]
})
export class MaterialModule {
}
