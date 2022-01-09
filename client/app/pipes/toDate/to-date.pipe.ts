import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDate',
  pure: true,
})
export class ToDatePipe implements PipeTransform {
  transform(value?: string | null): Date {
    return new Date(value ?? Date.now());
  }
}
