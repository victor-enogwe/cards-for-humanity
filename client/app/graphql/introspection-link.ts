import { ApolloLink, NextLink, Operation } from '@apollo/client/core';
import { ExecutionResult } from 'graphql';
import Observable from 'zen-observable';
import introspectionResult from './graphql.schema.json';

/**
 * Serves introspection operations. For example, the Apollo Client
 * Chrome Devtool issues an introspection operation when it opens
 * in order to display the schema.
 */
export class IntrospectionLink extends ApolloLink {
  request(operation: Operation, forward?: NextLink) {
    switch (operation.operationName) {
      case 'IntrospectionQuery':
        return new Observable<ExecutionResult>((subscriber) => {
          subscriber.next({ data: introspectionResult });
          subscriber.complete();
        });
    }

    if (forward) {
      return forward(operation);
    }

    throw new Error(`Unable to handle operation ${operation.operationName}`);
  }
}
