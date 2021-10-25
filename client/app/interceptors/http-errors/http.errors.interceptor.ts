import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'client/app/services/auth/auth.service';
import { from, lastValueFrom, Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { NotificationService } from '../../services/notification/notification.service';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {
  constructor(private notice: NotificationService, private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if ([401, 422].includes(error.status)) {
          this.authService.logOut();
        }
        let message = error.error.message || error.error.error.message;
        if (error.status === 0) {
          message = navigator.onLine ? 'Service down. Please try again later!' : 'Please check your internet connection';
        }
        return from(this.notice.notify(message, 'dismiss', { duration: 3000 })).pipe(
          mergeMap(() => lastValueFrom(throwError(() => error.error))),
        );
      }),
    );
  }
}
