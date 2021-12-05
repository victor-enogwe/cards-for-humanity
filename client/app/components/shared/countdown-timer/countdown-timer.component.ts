import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { interval, map } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { CahPallette, Timer } from '../../../@types/global';

@Component({
  selector: 'cah-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownTimerComponent {
  @Input() title = 'countdown timer';
  @Input() status = 'countdown ended';
  @Input() date!: Date;
  @Input() color: CahPallette = 'admin-approved';
  timer$ = interval(1000).pipe(
    map(() => this.timeDifferenceInSeconds()),
    takeWhile((time) => Object.values(time).some((interval) => interval > 0)),
  );

  private timeDifferenceInSeconds(): Timer {
    return this.allocateTimeUnits((new Date(this.date).getTime() - new Date().getTime()) / 1000);
  }

  private allocateTimeUnits(timeDifference: number): Timer {
    const seconds = Math.floor(timeDifference % 60);
    const minutes = Math.floor((timeDifference / 60) % 60);
    const hours = Math.floor((timeDifference / 60 / 60) % 24);
    const days = Math.floor(timeDifference / 60 / 60 / 24);

    return { seconds, minutes, hours, days };
  }
}
