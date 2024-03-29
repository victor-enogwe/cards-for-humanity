import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    MatCommonModule,
    MatFormFieldModule,
    MatSidenavModule,
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
    MatProgressSpinnerModule,
    MatCardModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatBottomSheetModule,
    CdkAccordionModule,
  ],
  exports: [
    MatCommonModule,
    MatFormFieldModule,
    MatSidenavModule,
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
    MatProgressSpinnerModule,
    MatCardModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBottomSheetModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    CdkAccordionModule,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false, showError: true } },
  ],
})
export class MaterialModule {}
