import { Directionality } from '@angular/cdk/bidi';
import {
  Overlay,
  OverlayKeyboardDispatcher,
  OverlayOutsideClickDispatcher,
  OverlayPositionBuilder,
  OverlayRef,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { DOCUMENT, Location } from '@angular/common';
import { ComponentFactoryResolver, Inject, Injectable, Injector, NgZone, Renderer2, RendererFactory2 } from '@angular/core';
import { DynamicOverlayService } from 'client/app/services/dynamic-overlay/dynamic-overlay.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingOverlayService extends Overlay {
  private readonly dynamicOverlayContainer: DynamicOverlayService;
  private renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) document: any,
    scrollStrategies: ScrollStrategyOptions,
    overlayContainer: DynamicOverlayService,
    componentFactoryResolver: ComponentFactoryResolver,
    positionBuilder: OverlayPositionBuilder,
    keyboardDispatcher: OverlayKeyboardDispatcher,
    injector: Injector,
    ngZone: NgZone,
    directionality: Directionality,
    ngLocation: Location,
    outsideClickDispatcher: OverlayOutsideClickDispatcher,
    rendererFactory: RendererFactory2,
  ) {
    super(
      scrollStrategies,
      overlayContainer,
      componentFactoryResolver,
      positionBuilder,
      keyboardDispatcher,
      injector,
      ngZone,
      document,
      directionality,
      ngLocation,
      outsideClickDispatcher,
    );
    this.renderer = rendererFactory.createRenderer(null, null);

    this.dynamicOverlayContainer = overlayContainer;
  }

  public setContainerElement(containerElement: HTMLElement): void {
    this.renderer.setStyle(containerElement, 'transform', 'translateZ(0)');
    this.dynamicOverlayContainer.setContainerElement(containerElement);
  }

  public createWithDefaultConfig(containerElement: HTMLElement): OverlayRef {
    this.setContainerElement(containerElement);
    return super.create({ positionStrategy: this.position().global().centerHorizontally().centerVertically(), hasBackdrop: true });
  }
}
