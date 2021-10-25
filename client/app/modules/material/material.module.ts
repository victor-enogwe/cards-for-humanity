import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  exports: [
    MatFormFieldModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
    MatInputModule,
    MatSnackBarModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,
    MatStepperModule,
    MatSliderModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatBadgeModule,
    MatTooltipModule,
    MatInputModule,
    MatSnackBarModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,
    MatStepperModule,
    MatSliderModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } },
  ],
})
export class MaterialModule {}
