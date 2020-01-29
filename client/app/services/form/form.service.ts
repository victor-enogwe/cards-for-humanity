import { Injectable } from '@angular/core'
import { AbstractControl } from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class FormService {

  fieldHasError(form: AbstractControl, field: string): boolean {
    return Boolean(form.errors && form.errors[field] && (form.touched || form.dirty))
  }
}
