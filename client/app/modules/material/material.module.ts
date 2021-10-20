import { NgModule } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'


@NgModule({
  exports: [MatFormFieldModule, MatInputModule, MatSnackBarModule, MatListModule, MatSelectModule],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatListModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
