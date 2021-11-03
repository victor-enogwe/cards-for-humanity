import { Injectable } from '@angular/core';
import get from 'lodash.get';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  log = console.log;

  constructor() {}

  getMessage(error: Error): string {
    const matches = get(error, 'message', '').match(/".+"/);
    return get(matches, '0', error?.message)
      .replace(/.+Error:|at.+/g, '')
      .replace(/\s?Error:.+/g, '.');
  }

  getStack(error: Error): string {
    return get(error, 'stack', '');
  }

  logError(error: Error): void {
    // Use external logging service
    if (!environment.production) {
      if (error.stack) {
        // console.log(error.name, error.stack);
      }
    }
  }
}
