import { HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'client/app/services/auth/auth.service';
import { GraphqlService } from 'client/app/services/graphql/graphql.service';
import omit from 'lodash.omit';
import { Observable, of } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  token$ = of(this.authService.cookieService.get('token'));
  bypassOrigins = [];

  constructor(private authService: AuthService, private graphQlService: GraphqlService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.token$.pipe(
      concatMap((token: string) => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const Authorization = request.headers.get('Authorization') ?? (token ? `Bearer ${token}` : '');
        const id = request.headers.get('loadingId') ?? 'nav';
        const url = request.url;
        const isExternalUrl = !['localhost'].some((link) => url.includes(link));
        const byPassHeadersURL = this.bypassOrigins.some((origin) => url.includes(origin));
        const defaultHeaders = this.graphQlService.headers(null, {
          headers: {
            'Content-Type': 'application/json',
            Authorization,
            loadingId: id,
          },
        }).headers;
        let omittedHeaders: string[] = [];

        if (isExternalUrl) {
          omittedHeaders = omittedHeaders.concat(['loadingId']);
        }

        if (byPassHeadersURL) {
          omittedHeaders = omittedHeaders.concat(['loadingId', 'Content-Type', 'Authorization']);
        }
        const headers = new HttpHeaders(omit(defaultHeaders, omittedHeaders));

        return next.handle(request.clone({ headers, responseType: request.responseType ?? 'json' })).pipe(
          tap((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Sent:
                break;
              case HttpEventType.Response:
                break;
              default:
            }
          }),
        );
      }),
    );
  }
}
