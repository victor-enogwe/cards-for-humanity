import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bool',
  pure: true,
})
export class BoolPipe implements PipeTransform {
  transform(value: unknown): boolean {
    return Boolean(value);
  }
}
