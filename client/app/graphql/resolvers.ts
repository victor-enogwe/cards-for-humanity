import { InMemoryCache } from '@apollo/client/core';
import { GenreNode, Resolvers } from '../@types/graphql';
import { GENRE_NODE_FRAGMENT } from './fragments';
import { NEW_GAME_QUERY } from './queries';

export const resolvers: Resolvers = {
  Query: {
    // newGame(_root, args, { cache }: { cache: InMemoryCache; getCacheKey: Function }) {
    //   const value: NewGameNode | null = cache.readQuery({
    //     query: NEW_GAME_QUERY,
    //   });
    //   console.log(value, _root);
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
