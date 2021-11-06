import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import get from 'lodash.get';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if ([401, 422].includes(error?.status)) {
          this.authService.logOut();
        }
        const defaultMessage = 'Something went wrong!';
        let message = get(error, 'message', get(error, 'error.message', get(error, 'error.error.message', defaultMessage)));
        if (error.status === 0) {
          message = navigator.onLine ? 'Service down. Please try again!' : 'Please check your internet connection';
        }
        return throwError(() => new Error(message));
      }),
    );
  }
}
