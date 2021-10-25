import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicOverlayService extends OverlayContainer {
  setContainerElement(containerElement: HTMLElement): void {
    // eslint-disable-next-line no-underscore-dangle
    this._containerElement = containerElement;
  }
}
