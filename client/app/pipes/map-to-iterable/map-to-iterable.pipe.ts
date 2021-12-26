import { Pipe, PipeTransform } from '@angular/core';
import { AnyObject } from '../../@types/global';

@Pipe({
  name: 'mapToIterable',
  pure: true,
})
export class MapToIterablePipe implements PipeTransform {
  transform<T = any>(dict: T | any): AnyObject[keyof AnyObject][] {
    switch (dict.constructor) {
      case Set:
        return Array.from(dict);
      case Array:
        return dict;
      default:
        return Object.entries(dict);
    }
  }
}
