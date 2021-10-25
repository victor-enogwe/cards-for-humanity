import { ScrollStrategy } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { Inject, Injectable, Injector, Optional, SkipSelf } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_SCROLL_STRATEGY } from '@angular/material/dialog';
import { DynamicOverlayService } from '../dynamic-overlay/dynamic-overlay.service';
import { LoadingOverlayService } from '../loading-overlay/loading-overlay.service';

@Injectable({
  providedIn: 'root',
})
export class CahDialogService extends MatDialog {
  private customOverlay: LoadingOverlayService;

  constructor(
    overlay: LoadingOverlayService,
    injector: Injector,
    @Optional() location: Location,
    @Inject(MAT_DIALOG_DEFAULT_OPTIONS) config: MatDialogConfig,
    @Inject(MAT_DIALOG_SCROLL_STRATEGY) scrollStrategy: ScrollStrategy,
    @Optional() @SkipSelf() parentDialog: CahDialogService,
    overlayContainer: DynamicOverlayService,
  ) {
    super(overlay, injector, location, config, scrollStrategy, parentDialog, overlayContainer);
    this.customOverlay = overlay;
  }

  public setContainerElement(containerElement?: HTMLElement): void {
    if (containerElement) this.customOverlay.setContainerElement(containerElement);
  }
}
