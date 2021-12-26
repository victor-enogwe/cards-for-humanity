import { ClipboardModule } from '@angular/cdk/clipboard';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationDialogComponent } from '../../components/shared/confirmation-dialog/confirmation-dialog.component';
import { FabMenuComponent } from '../../components/shared/fab-menu/fab-menu.component';
import { FabComponent } from '../../components/shared/fab/fab.component';
import { InstructionsComponent } from '../../components/shared/instructions/instructions.component';
import { LoadingComponent } from '../../components/shared/loading/loading.component';
import { NavComponent } from '../../components/shared/nav/nav.component';
import { NotificationsComponent } from '../../components/shared/notifications/notifications.component';
import { QRCodeComponent } from '../../components/shared/qr-code/qr-code.component';
import { ConfirmDialogDirective } from '../../directives/confirm-dialog/confirm-dialog.directive';
import { DebounceClickDirective } from '../../directives/debounce-click/debounce-click.directive';
import { DialogComponentDirective } from '../../directives/dialog-component/dialog-component.directive';
import { LoadingOverlayDirective } from '../../directives/loading-overlay/loading-overlay.directive';
import { MatInputFocusDirective } from '../../directives/mat-input-focus/mat-input-focus.directive';
import { QrCodeDirective } from '../../directives/qr-code/qr-code.directive';
import { MapToIterablePipe } from '../../pipes/map-to-iterable/map-to-iterable.pipe';
import { SafeUrlPipe } from '../../pipes/safe-url/safe-url.pipe';
import { TimeAgoPipe } from '../../pipes/time-ago/time-ago.pipe';
import { CahDialogService } from '../../services/cah-dialog/cah-dialog.service';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    NavComponent,
    LoadingComponent,
    ConfirmationDialogComponent,
    QRCodeComponent,
    FabComponent,
    FabMenuComponent,
    InstructionsComponent,
    NotificationsComponent,
    ConfirmDialogDirective,
    DebounceClickDirective,
    DialogComponentDirective,
    LoadingOverlayDirective,
    MatInputFocusDirective,
    QrCodeDirective,
    SafeUrlPipe,
    MapToIterablePipe,
    TimeAgoPipe,
  ],
  providers: [SafeUrlPipe, MapToIterablePipe, CahDialogService],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ScrollingModule,
    ClipboardModule,
    NavComponent,
    LoadingComponent,
    ConfirmationDialogComponent,
    QRCodeComponent,
    FabComponent,
    FabMenuComponent,
    InstructionsComponent,
    NotificationsComponent,
    SafeUrlPipe,
    MapToIterablePipe,
    TimeAgoPipe,
    ConfirmDialogDirective,
    DebounceClickDirective,
    DialogComponentDirective,
    LoadingOverlayDirective,
    MatInputFocusDirective,
    QrCodeDirective,
  ],
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, MaterialModule, ScrollingModule, ClipboardModule],
})
export class SharedModule {}
