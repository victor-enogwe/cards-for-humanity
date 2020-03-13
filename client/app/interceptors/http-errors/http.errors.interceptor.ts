import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable, from, throwError } from 'rxjs'
import { catchError, flatMap } from 'rxjs/operators'
import { NotificationService } from '../../services/notification/notification.service'
import { AuthService } from '../../services/auth/auth.service'

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

  constructor(private notice: NotificationService, private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      if ([401, 422].includes(error.status)) { this.authService.logOut() }
      let message = error.error.message || error.error.error.message
      if (error.status === 0) {
        message = navigator.onLine ? 'Service down. Please try again later!' : 'Please check your internet connection'
      }
      return from(this.notice.notify(message, 'dismiss', { duration: 3000 }))
        .pipe(flatMap(() => throwError(error.error.message).toPromise()))
    }))
  }
}
