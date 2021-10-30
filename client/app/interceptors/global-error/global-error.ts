import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorHandlerService } from 'client/app/services/error-handler/error-handler.service';
import { LoggerService } from 'client/app/services/logger/logger.service';
import { NotificationService } from 'client/app/services/notification/notification.service';
import get from 'lodash.get';
import { EMPTY, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobalErrorInterceptor implements ErrorHandler {
  constructor(
    private errorService: ErrorHandlerService,
    private notificationService: NotificationService,
    private loggerService: LoggerService,
  ) {}

  handleError(error: Error): Observable<never> {
    const message = this.errorService.getMessage(error);
    this.loggerService.logError(error);
    this.notificationService.notify(message, get(error, 'statusText', get(error, 'name')), { duration: 3000 });
    return EMPTY;
  }
}
