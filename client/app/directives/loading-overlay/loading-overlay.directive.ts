import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ComponentRef, Directive, ElementRef, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import assign from 'lodash.assign';
import pick from 'lodash.pick';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingComponent } from '../../components/shared/loading/loading.component';
import { LoadingOverlayService } from '../../services/loading-overlay/loading-overlay.service';
import { MatProgressSpinnerOptions } from '../../utils/mat-progress-spinner';

@Directive({
  selector: '[cfhOverlayLoading]',
})
export class LoadingOverlayDirective implements OnInit, OnDestroy {
  @Input() loading!: Observable<boolean>;
  @Input() loaderOptions!: MatProgressSpinnerOptions;
  subscription!: Subscription;
  private overlayRef: OverlayRef;

  constructor(private host: ElementRef<HTMLBaseElement>, private dynamicOverlay: LoadingOverlayService, private parentInjector: Injector) {
    this.overlayRef = this.dynamicOverlay.createWithDefaultConfig(this.host.nativeElement);
  }

  ngOnInit(): void {
    this.subscription = this.loading.pipe(map(this.toggleOverlay.bind(this))).subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleOverlay(show: boolean): ComponentRef<LoadingComponent> {
    const injector = this.getInjector({ ...this.loaderOptions, loaderClass: 'cfh-loading' }, this.parentInjector);
    return show ? this.overlayRef.attach(new ComponentPortal(LoadingComponent, null, injector)) : this.overlayRef.detach();
  }

  getInjector(options: MatProgressSpinnerOptions, parentInjector: Injector): PortalInjector {
    const tokens = new WeakMap();
    const data = pick(options, ['color', 'mode', 'diameter', 'value', 'strokeWidth', '_forceAnimation', 'loaderClass']);
    tokens.set(MatProgressSpinnerOptions, assign({ mode: 'indeterminate', diameter: 100, loaderClass: 'loader' }, data));
    return new PortalInjector(parentInjector, tokens);
  }
}
