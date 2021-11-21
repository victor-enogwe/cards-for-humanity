import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CahComponent } from '../../shared/cah/cah.component';

@Component({
  selector: 'cah-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  constructor(private cahComponent: CahComponent) {}

  ngAfterViewInit(): void {
    this.cahComponent.fullWidth$.next(true);
  }

  ngOnDestroy(): void {
    this.cahComponent.fullWidth$.next(false);
  }
}
