import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  log = console.log;

  constructor() {}

  logError(error: Error): void {
    // Use external logging service
    if (!environment.production) {
      console.log(`LoggingService: ${error?.message}`);
      if (error.stack) {
        console.log(error.name, error.stack);
      }
    }
  }
}
