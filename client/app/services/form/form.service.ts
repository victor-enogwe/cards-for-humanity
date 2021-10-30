import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  fieldHasError(form: AbstractControl, field: string): boolean {
    const control = form.get(field);
    return control?.errors !== null && (control?.touched === true || control?.dirty === true);
  }

  async validateRepeatPassword(repeatPasswordControl: AbstractControl): Promise<{ [key: string]: any } | null> {
    const repeatPasswordError = { repeatPassword: true };
    const password = repeatPasswordControl?.root?.get('password')?.value;
    const repeatPassword = repeatPasswordControl.value;
    return password === repeatPassword ? null : repeatPasswordError;
  }

  patternValidator({ pattern, field }: { pattern: RegExp; field: string }): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validator = Validators.pattern(pattern);
      const result = validator(control);
      const errors: ValidationErrors = {
        [field]: {
          ...result?.pattern,
          valid: false,
        },
      };

      return result === null ? null : errors;
    };
  }
}
