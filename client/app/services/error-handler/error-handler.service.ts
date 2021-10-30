import { Injectable } from '@angular/core';
import get from 'lodash.get';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  getMessage(error: Error): string {
    const matches = get(error, 'message', '').match(/".+"/);
    return get(matches, '0', error?.message).replace(/"/g, '');
  }

  getStack(error: Error): string {
    return get(error, 'stack', '');
  }
}
