import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'client/app/services/form/form.service';

@Component({
  selector: 'cah-reset-password',
  templateUrl: './reset-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
  showPassword = false;
  showRepeatPassword = false;
  resetPasswordForm = this.formBuilder.group({
    oldPassword: ['', [Validators.required]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        this.formService.patternValidator({ field: 'lowercase', pattern: /[a-z]/ }),
        this.formService.patternValidator({ field: 'uppercase', pattern: /[A-Z]/ }),
        this.formService.patternValidator({ field: 'numeric', pattern: /[0-9]/ }),
        this.formService.patternValidator({ field: 'special', pattern: /[!@#$%^&*()\-_=+{};:,<.>]/ }),
      ],
    ],
    repeatPassword: ['', Validators.required, this.formService.validateRepeatPassword],
  });

  constructor(private formBuilder: FormBuilder, private formService: FormService) {}

  resetPassword(form: FormGroup) {}
}
