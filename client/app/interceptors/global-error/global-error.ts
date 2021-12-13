import { ErrorHandler, Injectable } from '@angular/core';
import get from 'lodash.get';
import { EMPTY, Observable } from 'rxjs';
import { LoggerService } from '../../services/logger/logger.service';
import { NotificationService } from '../../services/notification/notification.service';

@Injectable({ providedIn: 'root' })
export class GlobalErrorInterceptor implements ErrorHandler {
  constructor(private notificationService: NotificationService, private loggerService: LoggerService) {}

  handleError(error: Error): Observable<never> {
    const message = this.loggerService.getMessage(error);
    this.loggerService.logError(error);
    this.notificationService.notify(message, get(error, 'statusText', get(error, 'name')), { duration: 3000 });
    return EMPTY;
  }
}
