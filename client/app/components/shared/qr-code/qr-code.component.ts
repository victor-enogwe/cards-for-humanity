import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QRCodeErrorCorrectionLevel } from 'qrcode';
import { ConfirmDialogData, RGBAColor } from '../../../@types/global';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'cfh-qrcode',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QRCodeComponent {
  @Input() value?: string = this.data.value;
  @Input() size?: number = this.data.size;
  @Input() darkColor?: RGBAColor = this.data.darkColor;
  @Input() lightColor?: RGBAColor = this.data.lightColor;
  @Input() errorCorrectionLevel?: QRCodeErrorCorrectionLevel = this.data.errorCorrectionLevel;
  @Input() centerImageSrc?: string = this.data.centerImageSrc;
  @Input() centerImageSize?: number = this.data.centerImageSize;
  @Input() margin?: number = this.data.margin;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QRCodeComponent & ConfirmDialogData,
  ) {}
}
