import { ClipboardModule } from '@angular/cdk/clipboard';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { ConfirmationDialogComponent } from '../../components/shared/confirmation-dialog/confirmation-dialog.component';
import { LoadingComponent } from '../../components/shared/loading/loading.component';
import { NavComponent } from '../../components/shared/nav/nav.component';
import { QrCodeComponent } from '../../components/shared/qr-code/qr-code.component';
import { ConfirmDialogDirective } from '../../directives/confirm-dialog/confirm-dialog.directive';
import { DebounceClickDirective } from '../../directives/debounce-click/debounce-click.directive';
import { DialogComponentDirective } from '../../directives/dialog-component/dialog-component.directive';
import { LoadingOverlayDirective } from '../../directives/loading-overlay/loading-overlay.directive';
import { MatInputFocusDirective } from '../../directives/mat-input-focus/mat-input-focus.directive';
import { SafeUrlPipe } from '../../pipes/safe-url/safe-url.pipe';
import { CahDialogService } from '../../services/cah-dialog/cah-dialog.service';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    NavComponent,
    LoadingComponent,
    ConfirmationDialogComponent,
    QrCodeComponent,
    SafeUrlPipe,
    ConfirmDialogDirective,
    DebounceClickDirective,
    DialogComponentDirective,
    LoadingOverlayDirective,
    MatInputFocusDirective,
  ],
  providers: [SafeUrlPipe, CahDialogService],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ScrollingModule,
    ClipboardModule,
    QRCodeModule,
    NavComponent,
    LoadingComponent,
    ConfirmationDialogComponent,
    QrCodeComponent,
    SafeUrlPipe,
    ConfirmDialogDirective,
    DebounceClickDirective,
    DialogComponentDirective,
    LoadingOverlayDirective,
    MatInputFocusDirective,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, ScrollingModule, ClipboardModule, QRCodeModule],
})
export class SharedModule {}
