import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloLink, FetchResult, NextLink, Observable as LinkObservable, Operation } from '@apollo/client/core';
import { Options } from 'apollo-angular/http';
import { Request } from 'apollo-angular/http/types';
import { environment } from 'client/environments/environment';
import { extractFiles } from 'extract-files';
import { print } from 'graphql';
import { Observable } from 'rxjs';
import { AnyObject } from '../../@types/global';

@Injectable({
  providedIn: 'root',
})
export class HttpLinkService extends ApolloLink {
  options: Options = { uri: environment.HTTP_LINK, withCredentials: true, includeQuery: true };
  print = this.options.operationPrinter ?? print;

  constructor(private httpClient: HttpClient) {
    super();
  }

  fetch(req: Request, httpClient: HttpClient): Observable<HttpResponse<Object>> {
    const shouldUseBody = ['POST', 'PUT', 'PATCH'].indexOf(req.method.toUpperCase()) !== -1;
    const shouldStringify = (param: string) => ['variables', 'extensions'].indexOf(param.toLowerCase()) !== -1;
    const isBatching = Array.isArray(req.body);
    let shouldUseMultipart = req.options && req.options.useMultipart;
    let multipartInfo;
    if (shouldUseMultipart) {
      if (isBatching) {
        return new Observable((observer) => observer.error(new Error('File upload is not available when combined with Batching')));
      }
      if (!shouldUseBody) {
        return new Observable((observer) => observer.error(new Error('File upload is not available when GET is used')));
      }
      multipartInfo = extractFiles(req.body);
      shouldUseMultipart = !!multipartInfo.files.size;
    }
    // `body` for some, `params` for others
    let bodyOrParams: AnyObject = {};
    if (isBatching) {
      if (!shouldUseBody) {
        return new Observable((observer) => observer.error(new Error('Batching is not available for GET requests')));
      }
      bodyOrParams = {
        body: req.body,
      };
    } else {
      const body = shouldUseMultipart ? multipartInfo?.clone : req.body;
      if (shouldUseBody) {
        bodyOrParams = {
          body,
        };
      } else {
        const params = Object.keys(req.body).reduce((obj: AnyObject, param: string) => {
          const value = Array.isArray(req.body) ? undefined : (req.body as any)[param];
          obj[param] = shouldStringify(param) ? JSON.stringify(value) : value;
          return obj;
        }, {});
        bodyOrParams = { params: params };
      }
    }
    if (shouldUseMultipart && shouldUseBody) {
      const form = new FormData();
      form.append('operations', JSON.stringify(bodyOrParams.body));
      const map: AnyObject = {};
      const files = multipartInfo?.files;
      let i = 0;
      files?.forEach((paths) => {
        map[++i] = paths;
      });
      form.append('map', JSON.stringify(map));
      i = 0;
      files?.forEach((_, file: any) => {
        form.append(++i + '', file, file.name);
      });
      bodyOrParams.body = form;
    }
    // create a request
    return httpClient.request(req.method, req.url, {
      observe: 'response',
      responseType: 'json',
      reportProgress: true,
      ...bodyOrParams,
      ...req.options,
    });
  }

  mergeHeaders(source?: HttpHeaders, destination?: HttpHeaders) {
    if (source && destination) {
      const merged = destination.keys().reduce((headers, name) => headers.set(name, destination.getAll(name) ?? ''), source);
      return merged;
    }
    return destination || source;
  }

  createHeadersWithClientAwareness(context: Options & { clientAwareness: { name?: string; version?: string } }) {
    // `apollographql-client-*` headers are automatically set if a
    // `clientAwareness` object is found in the context. These headers are
    // set first, followed by the rest of the headers pulled from
    // `context.headers`.
    let headers = context.headers && context.headers instanceof HttpHeaders ? context.headers : new HttpHeaders(context.headers);
    if (context.clientAwareness) {
      const { name, version } = context.clientAwareness;
      // If desired, `apollographql-client-*` headers set by
      // the `clientAwareness` object can be overridden by
      // `apollographql-client-*` headers set in `context.headers`.
      if (name && !headers.has('apollographql-client-name')) {
        headers = headers.set('apollographql-client-name', name);
      }
      if (version && !headers.has('apollographql-client-version')) {
        headers = headers.set('apollographql-client-version', version);
      }
    }
    return headers;
  }

  request(operation: Operation, forward?: NextLink): LinkObservable<FetchResult> | null {
    return new LinkObservable((observer) => {
      const context = operation.getContext() as Options & { clientAwareness: { name?: string; version?: string } };
      const method = context.method ?? this.options.method ?? 'POST';
      const url = context.uri ?? this.options.uri!;
      const withCredentials = context.withCredentials ?? this.options.withCredentials;
      const useMultipart = context.useMultipart ?? this.options.useMultipart;
      const req: Request = {
        method,
        url: typeof url === 'function' ? url(operation) : url,
        body: {
          query: this.print(operation.query),
          extensions: operation.extensions,
          operationName: operation.operationName,
          variables: operation.variables,
        },
        options: {
          withCredentials,
          useMultipart,
          headers: this.mergeHeaders(this.options.headers, this.createHeadersWithClientAwareness(context)),
        },
      };

      const sub = this.fetch(req, this.httpClient).subscribe({
        next: (response) => {
          operation.setContext({ response });
          observer.next(response.body!);
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
      return () => {
        if (!sub.closed) {
          sub.unsubscribe();
        }
      };
    });
  }
}
