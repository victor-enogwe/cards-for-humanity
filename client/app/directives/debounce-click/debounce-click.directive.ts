import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[cahDebounceClick]',
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input() debounceInterval = 2000;
  @Output() debounceClick = new EventEmitter();
  private clicks = new Subject<MouseEvent>();
  private subscription!: Subscription;

  constructor() {}

  @HostListener('click', ['$event'])
  clickEvent(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

  ngOnInit(): void {
    this.subscription = this.clicks
      .pipe(
        throttleTime<MouseEvent>(this.debounceInterval),
        map((e) => this.debounceClick.emit(e)),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
