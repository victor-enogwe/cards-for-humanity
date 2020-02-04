import { NgModule } from '@angular/core'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatListModule } from '@angular/material/list'


@NgModule({
  exports: [MatSnackBarModule, MatListModule],
  imports: [
    MatSnackBarModule,
    MatListModule
  ]
})
export class MaterialModule { }
