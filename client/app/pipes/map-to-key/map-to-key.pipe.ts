import { Pipe, PipeTransform } from '@angular/core';
import get from 'lodash.get';
import { AnyObject } from '../../@types/global';

@Pipe({
  name: 'mapToKey',
  pure: true,
})
export class MapToKeyPipe implements PipeTransform {
  transform(items: Array<AnyObject> = [], key: string): Array<any> {
    return key.length < 1 ? items : [...items].map((item) => get(item, key));
  }
}
