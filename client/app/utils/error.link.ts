import { FetchResult, NextLink, Operation } from '@apollo/client/core';
import { ApolloLink } from '@apollo/client/link/core/ApolloLink';
import { ErrorHandler } from '@apollo/client/link/error';
import { Observable } from 'rxjs';

function next(
  observer: ZenObservable.SubscriptionObserver<FetchResult<{ [key: string]: any }, Record<string, any>, Record<string, any>>>,
  operation: Operation,
  forward: NextLink,
  errorHandler: ErrorHandler,
) {
  return (value: FetchResult<{ [key: string]: any }, Record<string, any>, Record<string, any>>) => {
    const { errors } = value;
    if (errors) {
      const subscriber = errorHandler({ forward, operation, graphQLErrors: errors });
      if (subscriber)
        subscriber.subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      return observer.error(errors);
    }
    return observer.next(value);
  };
}

function error(operation: Operation, forward: NextLink, errorHandler: ErrorHandler) {
  return (networkError: any) => {
    return errorHandler({
      operation: operation,
      networkError: networkError,
      graphQLErrors: networkError && networkError.result && networkError.result.errors,
      forward: forward,
    });
  };
}

export function onError(errorHandler: ErrorHandler) {
  return new ApolloLink(function (this: ApolloLink, operation: Operation, forward: NextLink): any {
    const observer$ = forward(operation);
    return new Observable<FetchResult>((observer) => {
      const subscription = observer$.subscribe({
        next: next(observer, operation, forward, errorHandler),
        error: error(operation, forward, errorHandler),
        complete: observer.complete.bind(observer),
      });

      return subscription.unsubscribe;
    });
  });
}
