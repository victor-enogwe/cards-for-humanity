import { ComponentType } from '@angular/cdk/portal';
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import cloneDeep from 'lodash.clonedeep';
import { first, tap } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../../components/shared/confirmation-dialog/confirmation-dialog.component';

@Directive({
  selector: '[cahConfirmDialog]',
})
export class ConfirmDialogDirective {
  @Input('cahConfirmDialog') useDirective: boolean | undefined | any = false;
  @Input() listen = true;
  @Input() component!: ComponentType<any>;
  @Input() config!: MatDialogConfig;
  @Output() cahClick = new EventEmitter();
  @Output() confirmClick = new EventEmitter();
  @Output() denyClick = new EventEmitter();
  @Output() afterOpen: EventEmitter<string> = new EventEmitter();
  @Output() beforeClosed: EventEmitter<string> = new EventEmitter();
  confirmDialog: EventEmitter<boolean> = new EventEmitter();
  defaultConfig: MatDialogConfig = { maxWidth: '300px', autoFocus: true, hasBackdrop: true, disableClose: true };

  constructor(public dialog: MatDialog) {}

  @HostListener('click', ['$event'])
  clickEvent(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.component || !this.useDirective) return;
    const dialogRef = this.dialog.open(this.component ?? ConfirmationDialogComponent, { ...this.defaultConfig, ...this.config });
    if (this.listen) {
      const confirmClick = cloneDeep(this.confirmClick);
      const denyClick = cloneDeep(this.denyClick);
      dialogRef
        .afterOpened()
        .pipe(
          first(),
          tap(() => this.afterOpen.emit('afterOpen')),
        )
        .subscribe();
      dialogRef
        .beforeClosed()
        .pipe(
          first(),
          tap(() => this.beforeClosed.emit('beforeClosed')),
        )
        .subscribe();
      dialogRef
        .afterClosed()
        .pipe(tap((confirm) => this.confirm(confirm ? confirmClick : denyClick, confirm)))
        .subscribe();
    }
  }

  confirm(emitter: EventEmitter<any>, value: any): void {
    return emitter.emit(value);
  }
}
