import { DocumentNode, InMemoryCache } from '@apollo/client/core';
import { AnyObject } from '../@types/global';
import { GenreNode, Resolvers } from '../@types/graphql';
import { GENRE_NODE_FRAGMENT } from './fragments';
import { FULL_WIDTH_QUERY, NEW_GAME_QUERY } from './queries';

export function defaultResolver<T>(query: DocumentNode) {
  return (_root: AnyObject, args: AnyObject, { cache }: { cache: InMemoryCache; getCacheKey: Function }, info: AnyObject): T | null => {
    const value: T | null = cache.readQuery({
      query,
      returnPartialData: true,
      optimistic: true,
      canonizeResults: true,
    });
    return value;
  };
}

export const resolvers: Resolvers = {
  Query: {
    // newGame(_root, args, { cache }: { cache: InMemoryCache; getCacheKey: Function }) {
    //   const value: NewGameNode | null = cache.readQuery({
    //     query: NEW_GAME_QUERY,
    //   });
    //   return value;
    // },
  },
  Mutation: {
    createNewGame(_root, args, { cache }: { cache: InMemoryCache }) {
      const id = '1';
      cache.writeQuery({
        query: NEW_GAME_QUERY,
        data: {
          newGame: {
            __typename: 'NewGameNode',
            id,
            ...args.input,
          },
        },
        variables: { id },
      });

      return Promise.resolve({
        __typename: 'CreateNewGameMutation',
        newGame: {
          __typename: 'NewGameNode',
          id,
          ...(args.input as any),
        },
      });
    },
    setFullWidth(_root, args, { cache }: { cache: InMemoryCache }) {
      cache.writeQuery({
        query: FULL_WIDTH_QUERY,
        data: {
          __typename: 'Boolean',
          fullWidth: args.input.fullWidth,
        },
      });

      return Promise.resolve({
        __typename: 'SetFullWidthMutation',
        fullWidth: args.input.fullWidth,
      });
    },
  },
  GenreNode: {
    selected(_root, args, { cache, getCacheKey }: { cache: InMemoryCache; getCacheKey: Function }) {
      const value: GenreNode | null = cache.readFragment({
        id: getCacheKey({ __typename: _root.__typename, id: _root.id }),
        fragment: GENRE_NODE_FRAGMENT,
      });

      return value?.selected ?? false;
    },
  },
};
