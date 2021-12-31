import { Injectable } from '@angular/core';
import get from 'lodash.get';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  getMessage(error: Error): string {
    const matches = get(error, 'message', '').match(/".+"/);
    const message: string = get(matches, '0', error?.message)
      .replace(/.+Error:|at.+/g, '')
      .replace(/\s?Error:.+/g, '.')
      .replace(/_/g, ' ')
      .toLowerCase();
    return message.length > 50 ? `${message.slice(0, 45)}...` : message;
  }

  getStack(error: Error): string {
    return get(error, 'stack', '');
  }

  logError(error: Error): void {
    // Use external logging service
    if (!environment.production) {
      if (error.stack) {
        console.log(error.message);
        console.log(error.stack);
      }
    }
  }
}
