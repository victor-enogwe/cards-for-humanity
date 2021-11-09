import { ComponentType } from '@angular/cdk/portal';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import get from 'lodash.get';
import { first, tap } from 'rxjs/operators';
import { CahDialogService } from '../../services/cah-dialog/cah-dialog.service';
import { MainContentRefService } from '../../services/main-content-ref/main-content-ref.service';

@Directive({
  selector: '[cahDialogComponent]',
})
export class DialogComponentDirective {
  @Input() config!: MatDialogConfig;
  @Output() afterOpen: EventEmitter<string> = new EventEmitter();
  @Output() beforeClosed: EventEmitter<string> = new EventEmitter();
  @Output() afterClosed: EventEmitter<string> = new EventEmitter();
  @Input() component!: ComponentType<unknown>;

  constructor(public dialog: CahDialogService, public mainContentRefService: MainContentRefService) {}

  @HostListener('click', ['$event'])
  async clickEvent(event: MouseEvent): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    const mainContentRefService: MainContentRefService = get(this.component, 'mainContentRefService', this.mainContentRefService);
    const elementRef: ElementRef = get(this.component, 'viewContainerRef', mainContentRefService.ref);
    mainContentRefService.mainContentRef(elementRef);
    this.dialog.setContainerElement(mainContentRefService?.ref.nativeElement);
    const dialogRef = this.dialog.open(this.component, { width: '100%', height: '100%', ...this.config });
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
      .pipe(
        first(),
        tap(() => this.afterClosed.emit('afterClosed')),
      )
      .subscribe();
  }
}
