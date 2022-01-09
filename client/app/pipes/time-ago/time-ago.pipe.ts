import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  pure: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date, short?: boolean): string {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) return 'Just now';
      const shortIntervalNames: any = {
        year: 'yr',
        month: 'mth',
        week: 'wk',
        day: 'day',
        hour: 'hr',
        minute: 'min',
        second: 'sec',
      };
      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
      };

      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / (intervals as any)[i]);
        if (counter > 0)
          if (counter === 1) {
            return counter + ' ' + (short ? shortIntervalNames[i] : i) + ' ago'; // singular (1 day ago)
          } else {
            return counter + ' ' + (short ? shortIntervalNames[i] : i) + 's ago'; // plural (2 days ago)
          }
      }
    }
    return value.toISOString();
  }
}
